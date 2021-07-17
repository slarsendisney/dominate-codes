const { updateCaptures } = require("../../utils/updateCaptures")
const questions = require("../data/questionBank.json")

const maps = require("../map-data.json")
const intialColors = [
  { primary: "#F59E0B", lighter: "#FEF3C7", light: "#FBBF24", dark: "#D97706" },
  { primary: "#10B981", lighter: "#D1FAE5", light: "#34D399", dark: "#059669" },
  { primary: "#EC4899", lighter: "#DBEAFE",light: "#F472B6", dark: "#DB2777" },
]

async function roomSetup(roomId, category, map, socket, firebase) {
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
        counter: 5,
        owner: socket.id,
        colors: intialColors,
        players: [socket.id],
      },
      { merge: true }
    )
}

async function joinRoom(roomId, socket, firebase, io) {
  const doc = await firebase.firestore().collection("rooms").doc(roomId).get()
  if (doc.exists) {
    await firebase
      .firestore()
      .collection("rooms")
      .doc(roomId)
      .set(
        {
          players: firebase.firestore.FieldValue.arrayUnion(socket.id),
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

// adds all players
// adds initial game events
async function gameStart(roomId, firebase, io) {
  const document = await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .get()
  const { dimensions, counter, players, omissions } = document.data()

  // Create inclusions
  const inclusions = []
  for (var i = 0; i < dimensions.width; i++) {
    for (var j = 0; j < dimensions.height; j++) {
      if (!omissions?.[j]?.[i]) inclusions.push([i, j])
    }
  }

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
      gameEnd:false,
    },
    { merge: true }
  )
  // generate intial events
  sendGameState(roomId, firebase, io)
  gameLoop(roomId, firebase, io, dimensions, counter, players, inclusions)
}

function checkPlayersPresent(roomId, players, io) {
  const inRoom = io.sockets.adapter.rooms.get(roomId)
  let flag = true
  if (inRoom && players) {
    players.forEach(id => {
      if (!inRoom.has(id)) {
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
  // console.log(inclusions)
  const [x,y] =  inclusions[Math.floor(Math.random() * inclusions.length - 1)]
  return [y,x]
}

async function endGame(roomId, firebase, io) {
  await firebase.firestore().collection("rooms").doc(roomId).set(
    {
      gameEnd: true,
    },
    { merge: true }
  )
  sendGameState(roomId, firebase, io)
}

async function gameLoop(
  roomId,
  firebase,
  io,
  dimensions,
  counter,
  players,
  inclusions
) {
  let countdown = counter
  // await sendGameState(roomId, firebase, io)
  // at random time intervals add more

  var WinnerCountdown = setInterval(function () {
    if (players && checkPlayersPresent(roomId, players, io)) {
      io.to(roomId).emit("counter", countdown)
      countdown--

      if (typeof inclusions === "undefined") return 

      let rnd = Math.random()
      if (rnd < 0.5 && (typeof inclusions !== "undefined")) {
        generateEvent(
          roomId,
          getRandomCoordinates(dimensions, inclusions),
          firebase,
          io
        )
        sendGameState(roomId, firebase, io)
      }

      if (countdown === 0) {
        endGame(roomId, firebase, io)
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
