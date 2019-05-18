var player, canvas, globalHandler, bulletHandler;

function setup() {
    player = new Tank(
        600, // x
        400, // y
        30,  // Radius
        6,   // Maximum speed
        0.2,   // Accelerating speed
        0.5,   // Decelerating speed
        PI / 60,   // Turning speed
        'red'// Color
    );

    canvas = new Canvas(
        1300, // Width
        600   // Height
    );
    
    bulletHandler = new BulletHandler();
    globalHandler = new GlobalHandler();

    createCanvas(canvas.width, canvas.height);
}

function draw() {
    push();
    background(0, 0, 0);
    player.draw();
    bulletHandler.draw();
    globalHandler.draw()
    pop();
}