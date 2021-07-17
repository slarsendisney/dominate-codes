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
  "https://dominate.codes"
]
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
}

const server = express()
  .use(cors(corsOptions))
  //   .use(bodyParser.json())
  //   .use(express.urlencoded({ extended: true }))
  //   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
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
