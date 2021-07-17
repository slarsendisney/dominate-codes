module.exports = function (socket, io) {
  io.emit("action", {
    type: "userCount",
    data: io.engine.clientsCount,
  })
  socket.on("disconnect", function () {
    io.emit("action", {
      type: "userCount",
      data: io.engine.clientsCount,
    })
  })
}
