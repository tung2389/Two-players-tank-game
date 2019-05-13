const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3001,function(){
    console.log("Connected");
});
const io = require('socket.io')(server);

const HandleMatching = require('./controller/HandleMatching');
const HandleControlling = require('./controller/HandleControlling');
const HandleExiting = require('./controller/HandleExiting');

let queue = [];
let rooms = [];
let names = [];

app.get('/', (req,res) => {
    res.send("Hello. This is tank.io - two players game");
});

io.on('connection', function(socket) {
    console.log('User with id ' + socket.io + 'connected');

    socket.on("Find player", (data) => HandleMatching(queue,rooms,names,socket,data));
  
    socket.on("Control", (data) => HandleControlling(socket,rooms,data));

    socket.on('Disconnect', () => HandleExiting(socket, rooms));

    socket.on('Player disconnected', () => HandleExiting(socket,rooms));
})