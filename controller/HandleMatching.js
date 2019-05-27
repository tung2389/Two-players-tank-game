function handleMatch(queue, rooms, names, player, data){
    saveName(player, data, names);
    if(queue.length === 0) {
        queue.push(player);
        sendWaitingRequest(player);
    }
    else {
        match(queue, rooms, names, player);
    }
}

//Save player's name to names object
function saveName(player, data, names) {
    names[player.id] = data.name;
}

function sendWaitingRequest(player) {
    player.emit("Please wait");
}

function match(queue, rooms, names, player) {
    let opponent = queue.pop();
    let roomName = player.id + "#" + opponent.id;

    joinTwoPlayersIntoOneRoom(player, opponent, roomName);
    saveRoom(player, opponent, rooms, roomName);
    sendPlayersInfo(player, opponent, roomName, names);
}

function joinTwoPlayersIntoOneRoom(player, opponent, roomName) {
    player.join(roomName);
    opponent.join(roomName);
}

//Save roomName to rooms object
function saveRoom(player, opponent, rooms, roomName) {
    rooms[player.id] = roomName;
    rooms[opponent.id] = roomName;
}

//Send needed information to each client
function sendPlayersInfo(player, opponent, roomName, names) {
    player.emit('Starting battle', {
        'opponentName': names[opponent.id], 
        'room': roomName, 
        'number': 1
    });
    opponent.emit('Starting battle', {
        'opponentName': names[player.id], 
        'room': roomName, 
        'number': 0
    });
}



module.exports = handleMatch;