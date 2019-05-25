function handleControlling(player, rooms, data) {
    let roomName = rooms[player.id];
    player.broadcast.to(roomName).emit("Control", data);
}

module.exports = handleControlling;