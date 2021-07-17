const { updateCaptures } = require("../../utils/updateCaptures")
const questions = require("../data/questionBank.json")

const intialColors = [
  {primary: "#F59E0B", light:"#FBBF24", dark: "#D97706"},
  {primary: "#10B981", light:"#34D399", dark: "#059669"},
  {primary: "#EC4899",  light:"#F472B6", dark: "#DB2777"}
]

async function roomSetup(roomId, socket, firebase) {
  await firebase
    .firestore()
    .collection("rooms")
    .doc(roomId)
    .set(
      {
        dimensions: { width: 10, height: 10 },
        events: [],
        occupied: {},
        gameStart: false,
        gameEnd: false,
        counter: 180,
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
  const { dimensions, counter, players } = document.data()
  const events = [
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions),
      firebase,
      io,
      true
    ),
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions),
      firebase,
      io,
      true
    ),
    await generateEvent(
      roomId,
      getRandomCoordinates(dimensions),
      firebase,
      io,
      true
    ),
  ]
  await firebase.firestore().collection("rooms").doc(roomId).set(
    {
      gameStart: true,
      events,
    },
    { merge: true }
  )
  // generate intial events
  sendGameState(roomId, firebase, io)
  gameLoop(roomId, firebase, io, dimensions, counter, players)
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

function getRandomCoordinates(dimensions) {
  const x = Math.ceil(Math.random() * dimensions.width - 1)
  const y = Math.ceil(Math.random() * dimensions.height - 1)
  return [x, y]
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

async function gameLoop(roomId, firebase, io, dimensions, counter, players) {
  let countdown = counter
  // await sendGameState(roomId, firebase, io)
  // at random time intervals add more

  var WinnerCountdown = setInterval(function () {
    if (players && checkPlayersPresent(roomId, players, io)) {
      io.to(roomId).emit("counter", countdown)
      countdown--

      let rnd = Math.random()
      if (rnd < 0.15) {
        generateEvent(roomId, getRandomCoordinates(dimensions), firebase, io)
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
