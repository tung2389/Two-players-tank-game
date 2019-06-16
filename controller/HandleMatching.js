const generateRandomWallMap = require('./generateRandomWallMap');

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
    sendPlayersInfoAndMap(player, opponent, names);
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
function sendPlayersInfoAndMap(player, opponent, names) {
    let map = generateRandomWallMap();
    let playerData = constructPlayerData(player.id, opponent.id, names[opponent.id], 1, map);
    let opponentData = constructPlayerData(opponent.id, player.id, names[player.id], 0, map);
    player.emit('Starting battle', playerData);
    opponent.emit('Starting battle', opponentData);
}

function constructPlayerData(player_id, opponent_id, opponentName, number, map) {
    return {
        playersInfo: {
            'player_id': player_id,
            'opponent_id': opponent_id,
            'opponentName': opponentName,
            'number': number,
        },
        'map': map
    }
}

module.exports = handleMatch;