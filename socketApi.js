const socket_io = require('socket.io')

const io = socket_io()
const socketApi = {}
teamName = ''

socketApi.io = io

io.on("connection", (socket) => {
  console.log("user connected")

  socket.on("Team", (team) => {
    socket.leaveAll()
    console.log("team.name", team.name)
    teamName = team.name
    socket.join(team.name, () => {
    })
  })

  socket.on("test", () => {
    console.log("test")
  })

  socket.on('new-message', (message) => {
    console.log("teamName ", teamName)
    io.to(teamName).emit('new-message', message)
  })
})

module.exports = socketApi