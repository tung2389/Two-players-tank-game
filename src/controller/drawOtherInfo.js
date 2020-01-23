class DrawOtherInfo {
    drawHealth() {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text('Health', 20, 400);
        sketch2.fill('white');
        sketch2.rect(20, 420, 60, 10);
        sketch2.fill('green');
        sketch2.rect(20, 420, player.health * 60 / 6, 10);
        sketch2.pop();
    }
    drawPlayersInfo() {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text('Your name: ' + playerName, 6, 460);
        sketch2.text("Player2's name: " + playersData.opponentName, 6, 480);
        sketch2.text()
        sketch2.pop();
    }
}