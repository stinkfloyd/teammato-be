const socket_io = require('socket.io')

const io = socket_io()
const socketApi = {}
teamName = ''

socketApi.io = io

io.on("connection", (socket) => {
  console.log("user connected {id}:", socket.id)

  socket.on("Team", (team) => {
    socket.leave()
    console.log("team.name: ", team.name)
    console.log("socket.id: ", socket.id)
    console.log("socket.rooms (before): ", socket.rooms)
    teamName = team.name
    socket.join(team.name, () => {
      console.log("socket.rooms (after): ", socket.rooms)
    })
  })

  socket.on("test", () => {
    console.log("test")
  })

  socket.on('new-message', (message) => {
    console.log("teamName (should work) ", Object.keys(socket.rooms)[1])
    console.log("message ", message)
    io.to(Object.keys(socket.rooms)[0]).emit('new-message', message)
  })

  socket.on('disconnect', function () {
    console.log('socket.id disconnected:', socket.id)
  })
})

module.exports = socketApi