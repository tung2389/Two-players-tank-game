var socket = io();
var socketGlobalHandler = new SocetGlobalHandler();

function redirectTo(url) {
    window.location(url);
}

function isPlayerNameValid(playerName) {
    if(playerName !== "")
        return true;
    else
        return false;
}

function getUserName() {
    return document.getElementById('name').value;
}
class SocetGlobalHandler {
    constructor() {

    }

    move() {

    }

    changeDirection() {

    }

    shoot() {
        
    }
    
    setupListeningAndHandling() {
        socket.on('Please wait', redirectTo('/waiting'));
        socket.on('Starting battle', redirectTo('/play'));
    }

    findPlayer() {
        let playerName = getUserName();
        if(isPlayerNameValid(playerName)) {
            socket.emit('Find player',{name:playerName});
        }
        else {
            alert("Username cannot be empty");
        }
    }
}