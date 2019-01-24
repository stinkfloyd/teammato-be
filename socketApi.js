const socket_io = require('socket.io')

const io = socket_io()
const socketApi = {}
teamName = ''

socketApi.io = io

io.on("connection", (socket) => {
  console.log("user connected {id}:", socket.id)

  socket.on("Team", (team) => {
    socket.leaveAll()
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
    console.log("teamName ", teamName)
    console.log("message ", message)
    io.to(teamName).emit('new-message', message)
  })
})

module.exports = socketApi