var player, canvas, globalHandler;

function setup() {
    player = new Tank(
        600, // x
        400, // y
        30,  // Radius
        6,   // Maximum speed
        0.5,   // Accelerating speed
        0.5,   // Decelerating speed
        PI / 60,   // Turning speed
        'red'// Color
    );

    canvas = new Canvas(
        1300, // Width
        600   // Height
    );

    globalHandler = new GlobalHandler();

    createCanvas(canvas.width, canvas.height);
}

function draw() {
    push();
    background(0, 0, 0);
    player.draw();
    globalHandler.draw()
    pop();
}