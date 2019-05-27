const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3001,function(){
    console.log("Connected");
});
const io = require('socket.io')(server);

const handleMatching = require('./controller/handleMatching');
const handleControlling = require('./controller/handleControlling');
const handleExiting = require('./controller/handleExiting');

const gettingStartedPage = require('./routes/starting');
const waitingPage = require('./routes/waiting');
const gamePage = require('./routes/tank.io');

let queue = [];
let rooms = [];
let names = [];

app.get('/', (req,res) => {
    res.send("Hello. This is tank.io - two players game");
});

app.use('/',express.static(__dirname + '/client'));

// app.use('/gettingstarted', gettingStartedPage);
// app.use('/waiting', waitingPage);
app.use('/play', gamePage);

io.on('connection', function(socket) {
    console.log('User with id ' + socket.id + ' connected');

    socket.on("Find player", (data) => handleMatching(queue,rooms,names,socket,data));
  
    socket.on("Control", (data) => handleControlling(socket,rooms,data));

    socket.on('Disconnect', () => handleExiting(socket, rooms));

    socket.on('Player disconnected', () => handleExiting(socket,rooms));
})