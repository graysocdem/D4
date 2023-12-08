
const socket = require('socket.io')(3002)
const io = require('socket.io-client')

const otherSocket = io('http://localhost:3002')

otherSocket.on('connect', socket => {
  console.log(socket)
//   socket.on('message', (message) => { console.log(message) })
})

otherSocket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err}`);
  });