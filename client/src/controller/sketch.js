var player,opponent, canvas, globalHandler, bulletHandler;

function setup() {
    createAllObjects(playerData);
}

function draw() {
    drawAllObjects();
}

function createAllObjects(data) {
    canvas = new Canvas(
        1300, // Width
        600   // Height
    );

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
        propertyOfPlayer.color // Color of the tank
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
        propertyOfOpponent.color
    );

    bulletHandler = new BulletHandler();
    globalHandler = new GlobalHandler();

    createCanvas(canvas.width, canvas.height);
};

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

function drawAllObjects() {
    push();
    background(0, 0, 0);
    player.draw();
    opponent.draw();
    bulletHandler.draw();
    globalHandler.draw()
    pop();
}
