function HandleMatch(queue, rooms, names, player, data){
    SaveName(player, data, names);
    if(queue.length === 0) {
        queue.push(player);
        SendWaitingRequest(player);
    }
    else {
        Match(queue, rooms, names, player);
    }
}

function Match(queue, rooms, names, player) {
    let opponent = queue.pop();
    let roomName = player.id + "#" + opponent.id;

    JoinInRoom(player, opponent, roomName);
    SaveRoom(player, opponent, rooms, roomName);
    SendInfo(player, opponent, roomName, names)
}

function SendWaitingRequest(player) {
    player.emit("Please wait");
}

//Send needed information to each client
function SendInfo(player, opponent, roomName, names) {
    player.emit('Starting battle', {'name': names[opponent.id], 'room': roomName});
    opponent.emit('Starting battle', {'name': names[player.id], 'room': roomName});
}

//Save player's name to names object
function SaveName(player, data, names) {
    names[player.id] = data.name;
}

//Save roomName to rooms object
function SaveRoom(player, opponent, rooms, roomName) {
    rooms[player.id] = roomName;
    rooms[opponent.id] = roomName;
}

//Send them into one room
function JoinInRoom(player, opponent, roomName) {
    player.join(roomName);
    opponent.join(roomName);
}

module.exports = HandleMatch;