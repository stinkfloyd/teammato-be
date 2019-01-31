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
    socket.username = team.username
    socket.join(socket.teamName, () => {
      console.log("socket.rooms (after): ", socket.rooms)
      const logInEmit = {
        user: '**System**',
        message: `${socket.username} has logged in`,
        timestamp: new Date(Date.now())
      }
      io.in(`${socket.teamName}`).emit('new-message', logInEmit)
    })
  })

  socket.on("test", () => {
    console.log("test")
  })

  socket.on('new-message', (message) => {
    console.log("teamName (should work) ", socket.teamName)
    console.log("message ", message)
    console.log("typeOf: ", typeof socket.teamName)
    io.in(`${socket.teamName}`).emit('new-message', message)
  })

  socket.on('new-goal', (goal) => {
    console.log("goal:", goal)
    console.log("socket.teamName: ", socket.teamName)
    const goalEmit = {
      user: '**System**',
      message: `${goal.creator} has added a new goal - ${goal.title}`,
      timestamp: new Date(Date.now())
    }
    io.in(`${socket.teamName}`).emit('new-message', goalEmit)
    io.in(`${socket.teamName}`).emit('new-goal', goal)
  })

  socket.on('goal-accepted', (goal) => {
    console.log("goal-accepted:", goal)
    const acceptEmit = {
      user: '**System**',
      message: `${goal.acceptedBy} has accepted a new goal - ${goal.title}`,
      timestamp: new Date(Date.now())
    }
    io.in(`${socket.teamName}`).emit('new-message', acceptEmit)
    io.in(`${socket.teamName}`).emit('goal-accepted', goal)
  })

  socket.on('goal-completed', (goal) => {
    console.log("goal-completed:", goal)
    const completedEmit = {
      user: '**System**',
      message: `${goal.completedBy} has completed a goal - ${goal.title}`,
      timestamp: new Date(Date.now())
    }
    io.in(`${socket.teamName}`).emit('new-message', completedEmit)
    io.in(`${socket.teamName}`).emit('goal-completed', goal)
  })

  socket.on('goal-uncompleted', (goal) => {
    const unCompletedEmit = {
      user: '**System**',
      message: `${socket.username} has undone a goal to the backlog - ${goal.title}`,
      timestamp: new Date(Date.now())
    }
    io.in(`${socket.teamName}`).emit('new-message', unCompletedEmit)
    io.in(`${socket.teamName}`).emit('goal-uncompleted', goal)
  })

  socket.on('goal-deleted', (goal) => {
    const deletedEmit = {
      user: '**System**',
      message: `${socket.username} has removed a goal  - ${goal.title}`,
      timestamp: new Date(Date.now())
    }
    io.in(`${socket.teamName}`).emit('new-message', deletedEmit)
    io.in(`${socket.teamName}`).emit('goal-deleted', goal)
  })

  socket.on('disconnect', function () {
    console.log('socket.id disconnected:', socket.id)
  })
})

module.exports = socketApi