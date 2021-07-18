require("dotenv").config()
const PORT = process.env.PORT || 3000

require("firebase/firestore")

var firebase = require("firebase-admin")

var serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
})

var db = firebase.firestore()

const express = require("express")
// const bodyParser = require("body-parser");

var cors = require("cors")
var whitelist = [
  "http://localhost:8000",
  "http://localhost:9000",
  "https://dominate-fe.onrender.com",
  "http://dominate-fe.onrender.com",
  "http://dominate.codes",
  "https://dominate.codes",
]
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
}

const server = express()
  .use(cors(corsOptions))
  // .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .get("/leaderboard", cors(corsOptions), async function (req, res) {
    const leaderboardRef = db.collection("leaderboard")
    const snapshot = await leaderboardRef
      .orderBy("score", "desc")
      .limit(100)
      .get()
    const leaderboard = []
    snapshot.forEach(doc => {
      leaderboard.push(doc.data())
    })
    res.send(leaderboard)
  })
  .get("/stats", cors(corsOptions), async function (req, res) {
    const roomsRef = db.collection("rooms")
    const gamesPlayed = await roomsRef.get()
    const rooms = []
    const activeRooms = []
    let activePlayers = 0
    gamesPlayed.forEach(doc => {
      const data = doc.data()
      const {gameStart, gameEnd,players} = data
      rooms.push(true)
      if(!gameEnd && gameStart){
        activePlayers += players.length
        activeRooms.push(true)
      }
    })
    res.send({
      activeRooms: activeRooms.length,
      gamesPlayed: rooms.length,
      online: activePlayers,
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = require("socket.io")(server, {
  cors: {
    origin: function (origin, callback) {
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1
      callback(null, originIsWhitelisted)
    },
  },
})

io.on("connection", function (socket) {
  require("./game")(socket, io, firebase)
  require("./users")(socket, io)
})
