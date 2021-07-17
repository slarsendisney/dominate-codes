const {
  roomSetup,
  gameStart,
  sendGameState,
  joinRoom,
  captureRegion,
} = require("./utils/gameManipulation")
const { createRoomName } = require("./utils/roomNameGen")

module.exports = function (socket, io, firebase) {
  socket.on("create-room", async ({category, map}) => {
    const newRoom = createRoomName()
    await roomSetup(newRoom, category, map, socket, firebase)
    socket.join(newRoom)
    socket.emit("join-room", {
      room: newRoom,
    })
    sendGameState(newRoom, firebase, io)
  })
  socket.on("join-room", async ({ room }) => {
    await joinRoom(room, socket, firebase, io)
  })
  socket.on("game-start", ({ room }) => {
    gameStart(room, firebase, io)
  })
  socket.on(
    "question-victory",
    ({ room, id, timeStart, timeStop, position }) => {
      captureRegion(room, id, position, socket.id, firebase, io)
    }
  )
}
