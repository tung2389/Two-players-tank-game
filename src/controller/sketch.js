var tanks = [], canvas2, globalHandler, bulletHandler, grenadeHandler, smokeHandler, wallHandler, reloadingHandler, drawOtherInfo;
var sketch1, sketch2;
var grenadeSound, explosionSound, gunSound, smokeSound;
const FPS = 60;
const numberOfTanks = 2;

var canvas = new Canvas(
    1240, // Width
    635   // Height
);

const tanksProperties = [
    {
        x: 40,
        y: canvas.height / 2,
        angle: Math.PI,
        color: 'red'
    },
    {
        x: canvas.width - 40,
        y: canvas.height / 2,
        angle: 0,
        color: 'green'
    }
]

const main_canvas = ( sketch ) => {
    sketch1 = sketch;
    sketch.setup = () => {
        createAllObjects();
        prepareSound();
    }
    
    sketch.draw = () => {
        drawAllObjects();
    }

    function prepareSound() {
        // gunSound = sketch.loadSound("src/sound/gun.mp3");
        // grenadeSound = sketch.loadSound("src/sound/grenade.mp3");
        // explosionSound = sketch.loadSound("src/sound/explosion.mp3");
        // smokeSound = sketch.loadSound("src/sound/smoke.mp3")
    }

    function createAllObjects() {
        createTheCanvas();
        createTanks();
        createHandlers();
        //createWalls();
    };
    
    function createTheCanvas() {
        console.log(canvas);
        sketch.createCanvas(canvas.width, canvas.height);
    }

    function createTanks() {
        for(let i = 0; i < numberOfTanks; i++) {
            tanks.push(new Tank(
                tanksProperties[i].x,       // x-coordinate
                tanksProperties[i].y,       // y-coordinate
                tanksProperties[i].angle,   // Initial angle
                15,                         // Radius
                tanksProperties[i].color,   // Tank's color
                6,                          // Maximum speed
                0.2,                        // Accelerating speed
                0.2,                        // Decelerating speed
                sketch.PI / 60,             // Turning speed
                6,                          // Player's health
                i                           // Player's id
            ))
        }
    }
    
    function createHandlers() {
        bulletHandler = new BulletHandler(
            30,
            5
        );
        grenadeHandler = new GrenadeHandler(
            1,
            10
        );
        smokeHandler = new SmokeHandler(
            1,
            10
        );
        // drawOtherInfo = new DrawOtherInfo();
        globalHandler = new GlobalHandler();
    }
    
    function drawBackground() {
        sketch.stroke('black');
        sketch.fill('white');
        sketch.rect(0, 0, canvas.width, canvas.height);
    }
    
    function drawTanks() {
        for( let i = 0; i < numberOfTanks; i++) {
            let tank = tanks[i];
            tank.draw();
        }
    }
    
    function runAllHandlers() {
        bulletHandler.draw();
        globalHandler.draw();
        grenadeHandler.draw();
        smokeHandler.draw();
        // wallHandler.draw();
    }
    
    function drawAllObjects() {
        // if(globalHandler.gameEnded() === false) {
            sketch.push();
            drawBackground();
            drawTanks();
            runAllHandlers();
            sketch.pop();
        // }
        // else {
        //     globalHandler.handleFinalResult();
        // }
    }
}

let m1 = new p5(main_canvas);

const info_canvas = (sketch) => {
    sketch2 = sketch;
    sketch.setup = () => {
        canvas2 = sketch.createCanvas(100, 635);
        canvas2.position(1242, 0);
    }
    // sketch.draw = () => {
    //     sketch.clear();
    //     bulletHandler.drawReloading(60, 80, 'Bullets');
    //     grenadeHandler.drawReloading(60, 200, 'Grenade');
    //     smokeHandler.drawReloading(60, 320, 'Smoke');
    //     drawOtherInfo.drawHealth();
    //     drawOtherInfo.drawPlayersInfo();
    // }
}

let m2 = new p5(info_canvas);