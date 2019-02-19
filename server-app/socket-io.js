const socketIO = {
  socketIO: null,
  clientSocket: null,
  init: (io) => {
    this.socketIO = io
    io.on('connection', client => {
      this.clientSocket = client
    })
  },
  pushMessage: (data) => {
    this.socketIO.sockets.emit(data.channel, data.data)
  },
}

module.exports = socketIO
