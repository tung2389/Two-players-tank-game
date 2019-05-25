var player,opponent, canvas, globalHandler, bulletHandler;


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

function startGame(data) {
    canvas = new Canvas(
        1300, // Width
        600   // Height
    );
    let typeOfPlayer = data.name;
    let propertyOfPlayer = getPropertyOfPlayerBasedOnType(typeOfPlayer);

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

    );

    bulletHandler = new BulletHandler();
    globalHandler = new GlobalHandler();

    createCanvas(canvas.width, canvas.height);
};

function setup() {
    socket.on("Starting battle", function(data) {
        startGame(data);
    });
}

function draw() {
    push();
    background(0, 0, 0);
    player.draw();
    bulletHandler.draw();
    globalHandler.draw()
    pop();
}