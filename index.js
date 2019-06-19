const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(process.env.PORT || 3001,function(){
    console.log("Connected");
});
const io = require('socket.io')(server);

//Write filenames in uppercase in order to fit with heroku
const handleMatching = require('./controller/HandleMatching');
const handleControlling = require('./controller/HandleControlling');
const handleExiting = require('./controller/HandleExiting');

const gamePage = require('./routes/tank.io');

//heroku only
//process.env.PWD = process.cwd();

let queue = [];
let rooms = [];
let names = [];

//heroku only
//app.use('/',express.static(path.join(process.env.PWD, 'client')));

app.use('/',express.static(__dirname + '/client'));

app.use('/', gamePage);

io.on('connection', function(socket) {
    console.log('User with id ' + socket.id + ' connected');

    socket.on("Find player", (data) => handleMatching(queue,rooms,names,socket,data));
  
    socket.on("Control", (data) => handleControlling(socket,rooms,data));

    socket.on('Disconnect', () => handleExiting(socket, rooms));

    socket.on('Player disconnected', () => handleExiting(socket,rooms));
})