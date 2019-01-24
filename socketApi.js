const socket_io = require('socket.io')

const io = socket_io()
const socketApi = {}
teamName = ''

socketApi.io = io

io.on("connection", (socket) => {
  console.log("user connected {id}:", socket.id)

  socket.on("Team", (team) => {
    socket.leave(socket.teamName, () => {
      console.log("socket.rooms in leave(): ", socket.rooms)
    })
    console.log("team.name: ", team.name)
    console.log("socket.id: ", socket.id)
    console.log("socket.rooms (before): ", socket.rooms)
    socket.teamName = team.name
    socket.join(socket.teamName, () => {
      console.log("socket.rooms (after): ", socket.rooms)
    })
  })

  socket.on("test", () => {
    console.log("test")
  })

  socket.on('new-message', (message) => {
    console.log("teamName (should work) ", socket.teamName)
    console.log("message ", message)
    io.emit('new-message', message)
  })

  socket.on('disconnect', function () {
    console.log('socket.id disconnected:', socket.id)
  })
})

module.exports = socketApi