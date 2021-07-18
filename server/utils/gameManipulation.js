const { updateCaptures } = require("../../utils/updateCaptures")
const questions = require("../data/questionBank.json")

const maps = require("../map-data.json")
const intialColors = [
  // 500, 100, 300, 600
  { primary: "#F59E0B", lighter: "#FDE68A", light: "#FBBF24", dark: "#B45309" }, // Amber
  { primary: "#3B82F6", lighter: "#BFDBFE", light: "#60A5FA", dark: "#1E40AF" }, // blue
  { primary: "#84CC16", lighter: "#D9F99D", light: "#A3E635", dark: "#4D7C0F" }, // lime
  { primary: "#EC4899", lighter: "#DBEAFE", light: "#F472B6", dark: "#DB2777" }, // pink
  { primary: "#D946EF", lighter: "#F5D0FE", light: "#E879F9", dark: "#A21CAF" }, // Fuchsia
  { primary: "#0EA5E9", lighter: "#BAE6FD", light: "#38BDF8", dark: "#075985" }, // Sky
  { primary: "#06B6D4", lighter: "#A5F3FC", light: "#22D3EE", dark: "#155E75" }, // Cyan
  { primary: "#14B8A6", lighter: "#99F6E4", light: "#2DD4BF", dark: "#0F766E" }, // Teal
  { primary: "#EAB308", lighter: "#FEF08A", light: "#FACC15", dark: "#A16207" }, // Yellow
  { primary: "#F97316", lighter: "#FED7AA", light: "#FB923C", dark: "#C2410C" }, // Orange
  { primary: "#EF4444", lighter: "#FECACA", light: "#F87171", dark: "#B91C1C" }, // Red
  { primary: "#A855F7", lighter: "#E9D5FF", light: "#C084FC", dark: "#6B21A8" }, // Purple
]

async function roomSetup(roomId, name, category, map, socket, firebase) {
  await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .set(
      {
        ...maps[category][map],
        events: [],
        occupied: {},
        gameStart: false,
        gameEnd: false,
        counter: 100,
        owner: socket.id,
        colors: intialColors,
        players: [{ socket: socket.id, name }],
      },
      { merge: true }
    )
}

async function joinRoom(roomId, name, socket, firebase, io) {
  try {
    const doc = await firebase.firestore().collection("rooms").doc(roomId).get()
    if (doc.exists) {
      if (doc.data().players.length < 12) {
        await firebase
          .firestore()
          .collection("rooms")
          .doc(roomId)
          .set(
            {
              players: firebase.firestore.FieldValue.arrayUnion({
                name,
                socket: socket.id,
              }),
            },
            { merge: true }
          )
        socket.join(roomId)
        socket.emit("join-room", {
          room: roomId,
        })
        sendGameState(roomId, firebase, io)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

function calcInclusions(dimensions, omissions) {
  const inclusions = []
  for (var i = 0; i < dimensions.width; i++) {
    for (var j = 0; j < dimensions.height; j++) {
      if (!omissions?.[j]?.[i]) inclusions.push([i, j])
    }
  }
  return inclusions
}
async function gameStart(roomId, firebase, io) {
  const document = await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()
  const { dimensions, counter, players, omissions } = document.data()

  // Create inclusions
  const inclusions = calcInclusions(dimensions, omissions)

  if (typeof inclusions === "undefined") return

  const events = [
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions, inclusions),
      firebase,
      io,
      true
    ),
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions, inclusions),
      firebase,
      io,
      true
    ),
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions, inclusions),
      firebase,
      io,
      true
    ),
  ]
  await firebase.firestore().collection("rooms").doc(roomId).set(
    {
      events,
      occupied: {},
      gameStart: true,
      gameEnd: false,
    },
    { merge: true }
  )
  // generate intial events
  sendGameState(roomId, firebase, io)
  gameLoop(roomId, firebase, io, dimensions, counter, players, omissions)
}

function checkPlayersPresent(roomId, players, io) {
  const inRoom = io.sockets.adapter.rooms.get(roomId)
  let flag = true
  if (inRoom && players) {
    players.forEach(({ socket }) => {
      if (!inRoom.has(socket)) {
        flag = false
      }
    })
  }
  return flag
}

async function generateEvent(roomId, position, firebase, io, noWrite) {
  const question = await getQuestion(firebase, io)

  const event = {
    position: position,
    progress: "idle", // idle | inProgress | complete
    question: question,
    shape: question.shape,
  }

  if (noWrite) {
    return event
  }

  firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .set(
      {
        events: firebase.firestore.FieldValue.arrayUnion(event),
      },
      { merge: true }
    )
}

// todo: get questions from the db
async function getQuestion(firebase, io) {
  return questions[Math.ceil(Math.random() * questions.length - 1)]
}

function sendGameState(roomId, firebase, io) {
  firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()
    .then(data => io.to(roomId).emit("gameState", data.data()))
}

function getRandomCoordinates(dimensions, inclusions) {
  const position = inclusions[Math.floor(Math.random() * inclusions.length - 1)]
  const [x, y] = position || [-1, -1]
  return [y, x]
}

async function endGame(roomId, players, firebase, io) {
  const document = await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()

  const { occupied, dimensions } = document.data()
  const playerProgress = Object.keys(occupied).reduce((acc, x) => {
    Object.keys(occupied[x]).map(y => {
      const user = occupied[x][y]
      if (acc[user]) {
        acc[user].count += 1
      } else {
        acc[user] = {
          count: 1,
        }
      }
    })
    return acc
  }, {})
  Object.keys(playerProgress).map(key => {
    playerProgress[key].name = players.find(({ socket }) => socket === key).name
  })
  const winningOrder = Object.keys(playerProgress).sort(
    (a, b) => playerProgress[b].count - playerProgress[a].count
  )
  if (winningOrder.length !== 0) {
    const [winner, ...rest] = winningOrder
    try {
      await firebase.firestore().collection("rooms").doc(roomId).set(
        {
          gameEnd: true,
          winner: playerProgress[winner].name,
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }

    sendGameState(roomId, firebase, io)
    try {
      await firebase
        .firestore()
        .collection("leaderboard")
        .doc(playerProgress[winner].name)
        .set(
          {
            user: playerProgress[winner].name,
            score: firebase.firestore.FieldValue.increment(500),
          },
          { merge: true }
        )
    } catch (e) {
      console.log(e)
    }
    for (user in rest) {
      try {
        await firebase
          .firestore()
          .collection("leaderboard")
          .doc(playerProgress[user].name)
          .set(
            {
              user: playerProgress[user].name,
              score: firebase.firestore.FieldValue.increment(200),
            },
            { merge: true }
          )
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    try {
      await firebase.firestore().collection("rooms").doc(roomId).set(
        {
          gameEnd: true,
          winner: players[0].name,
        },
        { merge: true }
      )
    } catch (e) {
      console.log(e)
    }

    sendGameState(roomId, firebase, io)
  }
}

async function gameLoop(
  roomId,
  firebase,
  io,
  dimensions,
  counter,
  players,
  omissions
) {
  let countdown = counter
  // await sendGameState(roomId, firebase, io)
  // at random time intervals add more

  var WinnerCountdown = setInterval(function () {
    if (players && checkPlayersPresent(roomId, players, io)) {
      io.to(roomId).emit("counter", countdown)
      countdown--

      let inclusions = calcInclusions(dimensions, omissions)

      let rnd = Math.random()
      if (rnd < 0.5 && typeof inclusions !== "undefined") {
        try {
          generateEvent(
            roomId,
            getRandomCoordinates(dimensions, inclusions),
            firebase,
            io
          )
          sendGameState(roomId, firebase, io)
        } catch (e) {
          console.log(e)
        }
      }

      if (countdown === 0) {
        endGame(roomId, players, firebase, io)
        clearInterval(WinnerCountdown)
      }
    } else {
      clearInterval(WinnerCountdown)
    }
  }, 1000)
}

async function captureRegion(roomId, id, position, user, firebase, io) {
  const document = await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()
  const { events, occupied, dimensions } = document.data()
  let newEvents = events.map(event =>
    event.question.id === id ? { ...event, progress: "complete" } : event
  )
  const { shape } = events.find(({ question }) => question.id === id)
  let newCaptures = { ...occupied }
  const [x, y] = position
  updateCaptures(newCaptures, user, shape, dimensions, x, y)

  await firebase.firestore().collection("rooms").doc(roomId).set(
    {
      events: newEvents,
      occupied: newCaptures,
    },
    { merge: true }
  )
  sendGameState(roomId, firebase, io)
}

module.exports = {
  roomSetup,
  joinRoom,
  gameStart,
  gameLoop,
  sendGameState,
  captureRegion,
}
