var player,opponent, canvas, playerGlobalHandler, opponentGlobalHandler, playerBulletHandler, opponentBulletHandler;

function setup() {
    setupSocketListeningForAction();
    createAllObjects(playerData);
}

function draw() {
    drawAllObjects();
}

function createAllObjects(data) {
    createTheCanvas();
    createTwoTanks(data);
    createHandlers();
};

function createTheCanvas() {
    canvas = new Canvas(
        1300, // Width
        600   // Height
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
        30,  // Radius
        6,   // Maximum speed
        0.2,   // Accelerating speed
        0.2,   // Decelerating speed
        PI / 60,   // Turning speed
        propertyOfPlayer.color, // Color of the tank,
        typeOfPlayer // The type of the player, for example: player 1 has type 0, player 2 has type 1
    );
    
    opponent = new Tank(
        propertyOfOpponent.x,
        propertyOfOpponent.y,
        propertyOfOpponent.angle,
        30,
        6,
        0.2,
        0.2,
        PI / 60,
        propertyOfOpponent.color,
        1 - typeOfPlayer
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
    playerBulletHandler = new BulletHandler(player);
    opponentBulletHandler = new BulletHandler(opponent);
    playerGlobalHandler = new GlobalHandler(player);
    opponentGlobalHandler = new GlobalHandler(opponent);
}

function setupSocketListeningForAction() {
    socketGlobalHandler.listenForControllingAction();
}

function drawAllObjects() {
    push();
    background(0, 0, 0);
    player.draw();
    opponent.draw();
    playerBulletHandler.draw();
    opponentBulletHandler.draw();
    playerGlobalHandler.draw()
    pop();
}
