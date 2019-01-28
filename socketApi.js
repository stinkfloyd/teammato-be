const socketIO = require('socket.io')

const io = socketIO()
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
    console.log("typeOf: ", typeof socket.teamName)
    io.to(`${socket.teamName}`).emit('new-message', message)
  })

  socket.on('new-goal', (goal) => {
    console.log("goal:", goal)
    console.log("socket.teamName: ", socket.teamName)
    const goalEmit = {
      user: '**System**',
      message: 'A new Goal has been added',
      timestamp: new Date(Date.now())
    }
    io.to(`${socket.teamName}`).emit('new-message', goalEmit)
    io.to(`${socket.teamName}`).emit('new-goal', goal)
  })

  socket.on('disconnect', function () {
    console.log('socket.id disconnected:', socket.id)
  })
})

module.exports = socketApi