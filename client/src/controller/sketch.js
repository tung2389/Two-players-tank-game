var player, opponent, canvas, canvas2, globalHandler, bulletHandler, grenadeHandler, smokeHandler, wallHandler, reloadingHandler, drawOtherInfo;
var sketch1, sketch2;
var grenadeSound, explosionSound, gunSound, smokeSound;
const FPS = 60;

const main_canvas = ( sketch ) => {
    sketch1 = sketch;
    sketch.setup = () => {
        setupSocketListeningForAction();
        createAllObjects(playersData);
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

    function createAllObjects(data) {
        createTheCanvas();
        createTwoTanks(data);
        createHandlers();
        //createWalls();
    };
    
    function createTheCanvas() {
        canvas = new Canvas(
            1240, // Width
            635   // Height
        );
        sketch.createCanvas(canvas.width, canvas.height);
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
            sketch.PI / 60,   // Turning speed
            propertyOfPlayer.color, // Color of the tank,
            typeOfPlayer, // The type of the player, for example: player 1 has type 0, player 2 has type 1
            6, // The health of the player
            playersData.player_id // The id of the player
        );
        
        opponent = new Tank(
            propertyOfOpponent.x,
            propertyOfOpponent.y,
            propertyOfOpponent.angle,
            15,
            6,
            0.2,
            0.2,
            sketch.PI / 60,
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
            angle = sketch.PI;
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
        drawOtherInfo = new DrawOtherInfo();
        globalHandler = new GlobalHandler();
    }
    
    function createWalls() {
        wallHandler = new WallHandler(wallMap);
    }
    
    function setupSocketListeningForAction() {
        socketGlobalHandler.listenForControllingAction();
    }
    
    function drawBackground() {
        sketch.stroke('black');
        sketch.fill('white');
        sketch.rect(0, 0, canvas.width, canvas.height);
    }
    
    function drawTwoPlayers() {
        player.draw();
        opponent.draw();
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
            sketch.push();
            drawBackground();
            drawTwoPlayers();
            runAllHandlers();
            sketch.pop();
        }
        else {
            globalHandler.handleFinalResult();
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
    sketch.draw = () => {
        sketch.clear();
        bulletHandler.drawReloading(60, 80, 'Bullets');
        grenadeHandler.drawReloading(60, 200, 'Grenade');
        smokeHandler.drawReloading(60, 320, 'Smoke');
        drawOtherInfo.drawHealth();
        drawOtherInfo.drawPlayersInfo();
    }
}

let m2 = new p5(info_canvas);