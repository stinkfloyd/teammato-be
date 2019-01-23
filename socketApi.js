const socket_io = require('socket.io')

const io = socket_io()
const socketApi = {}

socketApi.io = io

io.on("connection", (socket) => {
  console.log("user connected")
  let previousId
  const safeJoin = (currentId) => {
    socket.leave(previousId)
    socket.join(currentId)
    previousId = currentId
  }

  socket.on("test", () => {
    console.log("test")
  })

  socket.on("test2", () => {
    console.log("test2")
  })

  socket.on("test3", () => {
    console.log("test3")
  })

  // io.emit("documents", Object.keys(documents))
})

socketApi.sendNotification = function () {
  io.sockets.emit('hello', { msg: 'Hello World!' })
}

module.exports = socketApi