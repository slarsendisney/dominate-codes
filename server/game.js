const {
  roomSetup,
  gameStart,
  sendGameState,
  joinRoom,
  captureRegion,
} = require("./utils/gameManipulation")
const { createRoomName } = require("./utils/roomNameGen")

module.exports = function (socket, io, firebase) {
  socket.on("create-room", async ({category, map ,name}) => {
    const newRoom = createRoomName()
    await roomSetup(newRoom, name, category, map, socket, firebase)
    socket.join(newRoom)
    socket.emit("join-room", {
      room: newRoom,
    })
    sendGameState(newRoom, firebase, io)
  })
  socket.on("join-room", async ({ room, name }) => {
    await joinRoom(room,name, socket, firebase, io)
  })
  socket.on("game-start", ({ room}) => {
    gameStart(room, firebase, io)
  })
  socket.on(
    "question-victory",
    ({ room, id, timeStart, timeStop, position }) => {
      captureRegion(room, id, position, socket.id, firebase, io)
    }
  )
}
