function handleExiting(player, rooms) {
    let roomName = rooms[player.id];
    player.broadcast.to(roomName).emit("Opponent disconnected");
}

module.exports = handleExiting;