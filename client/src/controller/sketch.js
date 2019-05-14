var tank, canvas;

function setup() {
    tank = new Tank(
        600, // x
        400, // y
        60,  // Radius
        4,   // Speed
        6,   // Maximum speed
        6,   // Accelerating speed
        6,   // Turning speed
        'red'// Color
    );

    canvas = new Canvas(
        1300, // Width
        600   // Height
    );

    createCanvas(canvas.width, canvas.height);
}

function draw() {
    push();
    background(0, 0, 0);
    tank.draw();
    pop();
}