var tanks = [], canvas2
var keyHandler, bulletHandler, grenadeHandler, smokeHandler, mineHandler, laserHandler, wallHandler, 
    reloadingHandler, drawOtherInfo, resultHandler;
var sketch1, sketch2;
var grenadeSound, explosionSound, gunSound, smokeSound;
const FPS = 60;
const numberOfTanks = 2;
const TANK_RADIUS = 15, MAX_SPEED = 6, ACCELERATING_SPEED = 0.2, DECELERATING_SPEED = 0.2,
      TURNING_SPEED = Math.PI / 60, TANK_HEALTH = 6;
const utils = new Utils()

var canvas = new Canvas(
    window.screen.width - 20, // Width   
    window.innerHeight - 80  // Height
);

const tanksProperties = [
    {
        x: 40,
        y: canvas.height / 2,
        angle: 0,
        color: 'red'
    },
    {
        x: canvas.width - 40,
        y: canvas.height / 2,
        angle: Math.PI,
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
        gunSound = sketch.loadSound("src/sound/gun.mp3");
        grenadeSound = sketch.loadSound("src/sound/grenade.mp3");
        explosionSound = sketch.loadSound("src/sound/explosion.mp3");
        smokeSound = sketch.loadSound("src/sound/smoke.mp3")
    }

    function createAllObjects() {
        createTheCanvas();
        createTanks();
        createHandlers();
        //createWalls();
    };
    
    function createTheCanvas() {
        sketch.createCanvas(canvas.width, canvas.height);
    }

    function createTanks() {
        for(let i = 0; i < numberOfTanks; i++) {
            tanks.push(new Tank(
                tanksProperties[i].x,       // x-coordinate
                tanksProperties[i].y,       // y-coordinate
                tanksProperties[i].angle,   // Initial angle
                TANK_RADIUS,                // Radius
                tanksProperties[i].color,   // Tank's color
                MAX_SPEED,                  // Maximum speed
                ACCELERATING_SPEED,         // Accelerating speed
                DECELERATING_SPEED,         // Decelerating speed
                TURNING_SPEED,              // Turning speed
                TANK_HEALTH,                // Player's health
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
        mineHandler = new MineHandler();
        laserHandler = new LaserHandler();
        // drawOtherInfo = new DrawOtherInfo();
        keyHandler = new KeyHandler();
        resultHandler = new ResultHandler();
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
        let testWall = new Wall(canvas.width/4, 0 ,canvas.width/4, 90, 6, 'black');
        testWall.draw();
        bulletHandler.draw();
        keyHandler.draw();
        grenadeHandler.draw();
        smokeHandler.draw();
        mineHandler.draw()
        laserHandler.draw()
        resultHandler.draw();
        // wallHandler.draw();
    }
    
    function drawAllObjects() {
        if(resultHandler.gameEnded === false) {
            sketch.push();
            drawBackground();
            drawTanks();
            runAllHandlers();
            sketch.pop();
        }
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