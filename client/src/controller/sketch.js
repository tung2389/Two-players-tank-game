var player, opponent, canvas, globalHandler, bulletHandler, grenadeHandler, smokeHandler, wallHandler;

function setup() {
    setupSocketListeningForAction();
    createAllObjects(playersData);
}

function draw() {
    drawAllObjects();
}

function createAllObjects(data) {
    createTheCanvas();
    createTwoTanks(data);
    createHandlers();
    //createWalls();
};

function createTheCanvas() {
    canvas = new Canvas(
        1340, // Width
        640   // Height
    );
    createCanvas(canvas.width, canvas.height);
}

function createTwoTanks(data) {
    let typeOfPlayer = data.number;
    let propertyOfPlayer = getPropertyOfPlayerBasedOnType(typeOfPlayer);
    let propertyOfOpponent = getPropertyOfPlayerBasedOnType(1 - typeOfPlayer);

    player = new Tank(
        propertyOfPlayer.x, // x-coordinate
        propertyOfPlayer.y, // y-coordinate
        propertyOfPlayer.angle, // The initial angle of the tank
        15,  // Radius
        6,   // Maximum speed
        0.2,   // Accelerating speed
        0.2,   // Decelerating speed
        PI / 60,   // Turning speed
        propertyOfPlayer.color, // Color of the tank,
        typeOfPlayer, // The type of the player, for example: player 1 has type 0, player 2 has type 1
        6, // The health of the player
        playersData.player_id, // The id of the player
    );
    
    opponent = new Tank(
        propertyOfOpponent.x,
        propertyOfOpponent.y,
        propertyOfOpponent.angle,
        15,
        6,
        0.2,
        0.2,
        PI / 60,
        propertyOfOpponent.color,
        1 - typeOfPlayer,
        6,
        playersData.opponent_id
    );
}

function getPropertyOfPlayerBasedOnType(typeOfPlayer) {
    let x, y, angle, color;
    if(typeOfPlayer === 1) {
        x = 40;
        y = canvas.height / 2;
        angle = PI;
        color = 'red';
    }
    else {
        x = canvas.width - 40;
        y = canvas.height / 2;;
        angle = 0;
        color = 'green';
    }
    return {
        x: x,
        y: y,
        angle: angle,
        color: color
    }
}

function createHandlers() {
    bulletHandler = new BulletHandler();
    globalHandler = new GlobalHandler();
    grenadeHandler = new GrenadeHandler();
    smokeHandler = new SmokeHandler();
}

function createWalls() {
    wallHandler = new WallHandler(wallMap);
}

function setupSocketListeningForAction() {
    socketGlobalHandler.listenForControllingAction();
}

function drawBackground() {
    stroke('black');
    fill('white');
    rect(0, 0, canvas.width, canvas.height);
}

function drawTwoPlayers() {
    player.draw();
    opponent.draw();
}

function drawInfo() {
    player.drawReloading();
}

function runAllHandlers() {
    bulletHandler.draw();
    globalHandler.draw();
    grenadeHandler.draw();
    smokeHandler.draw();
    // wallHandler.draw();
}

function drawAllObjects() {
    if(globalHandler.gameEnded() === false) {
        push();
        drawBackground();
        drawTwoPlayers();
        drawInfo();
        runAllHandlers();
        pop();
    }
    else {
        globalHandler.handleFinalResult();
    }
}
