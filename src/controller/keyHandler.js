const W_KEY = 87, A_KEY = 65, S_KEY = 83, D_KEY = 68, F_KEY = 70, G_KEY = 71, H_KEY = 72;
const SEMICONLON = 186, QUOTE = 222, ENTER_KEY = 13;
const KEY_CONTROL = [
    {
        UP: W_KEY,
        DOWN: S_KEY,
        LEFT: A_KEY,
        RIGHT: D_KEY,
        SHOOT: F_KEY,
        GRENADE: G_KEY,
        SMOKE: H_KEY
    },
    {
        UP: sketch1.UP_ARROW,
        DOWN: sketch1.DOWN_ARROW,
        LEFT: sketch1.LEFT_ARROW,
        RIGHT: sketch1.RIGHT_ARROW,
        SHOOT: ENTER_KEY,
        GRENADE: SEMICONLON,
        SMOKE: QUOTE
    }
]

class KeyHandler {
    constructor() {
        this.fireButtonPressed = [];
        this.throwGrenadeButtonPressed = [];
        this.throwSmokeButtonPressed = [];
        this.tanksDecelerate = [];
    }

    hanldeKeyTurn(tank, keySet) {
        let direction = undefined;
        if(sketch1.keyIsDown(keySet.LEFT)) {
            direction = 'LEFT';
        }
        if(sketch1.keyIsDown(keySet.RIGHT)) {
            direction = 'RIGHT';
        }   
        if(direction !== undefined) {
            tank.turn(direction);
        }
    }

    handleKeyDecelerate(tank, keySet) {
        if(sketch1.keyIsDown(keySet.UP) || sketch1.keyIsDown(keySet.DOWN)) {
            this.tanksDecelerate[tank.id] = false;
        }
        else if(this.tanksDecelerate[tank.id] === false){
            this.tanksDecelerate[tank.id] = true;
        }
    }

    handleKeyAccelerate(tank, keySet) {
        let direction = undefined;
        if(sketch1.keyIsDown(keySet.UP)) {
            direction = 'FORWARD';
        }
        if(sketch1.keyIsDown(keySet.DOWN)) {
            direction = 'BACKWARD';
        }
        if(direction !== undefined) {
            tank.accelerate(direction);
        }
    }

    handleKeyFire(tank, keySet) {
        if(sketch1.keyIsDown(keySet.SHOOT)) {
            if(!this.fireButtonPressed[tank.id]) { 
                if(bulletHandler.amount > 0) {         //Fix bulletHandler first
                    // bulletHandler.createBullet(tank.id);
                    // let tripleBullet = new TripleBullet(tank.id)
                    // tripleBullet.draw()
                    // mineHandler.createMine(tank.id)
                    laserHandler.createLaser(tank.id)
                }
            }
            this.fireButtonPressed[tank.id] = true;
        }
        else {
            this.fireButtonPressed[tank.id] = false;
        }
    }

    handleKeyThrowGrenade(tank, keySet) {
        if(sketch1.keyIsDown(keySet.GRENADE)) {
            if(!this.throwGrenadeButtonPressed[tank.id]) {
                if(grenadeHandler.amount > 0)           // Fix grenadeHandler first
                {
                    grenadeHandler.createGrenade(tank.id);
                }
            }
            this.throwGrenadeButtonPressed[tank.id] = true;
        }
        else {
            this.throwGrenadeButtonPressed[tank.id] = false;
        }
    }

    handleKeyThrowSmoke(tank, keySet) {
        if(sketch1.keyIsDown(keySet.SMOKE)) {
            if(!this.throwSmokeButtonPressed[tank.id]) {
                if(smokeHandler.amount > 0) {         
                    smokeHandler.createSmoke(tank.id);
                }
            }
            this.throwSmokeButtonPressed[tank.id] = true;
        }
        else {
            this.throwSmokeButtonPressed[tank.id] = false;
        }
    }

    handleKeyPress() {
        for( let i = 0; i < numberOfTanks; i++ ) {
            let tank = tanks[i];
            let keySet = KEY_CONTROL[i];
            this.hanldeKeyTurn(tank, keySet);
            this.handleKeyDecelerate(tank, keySet);
            this.handleKeyAccelerate(tank, keySet);
            this.handleKeyFire(tank, keySet);
            this.handleKeyThrowGrenade(tank, keySet);
            this.handleKeyThrowSmoke(tank, keySet);   
        }
    }

    handleDeceleration() {
        for( let i = 0; i < numberOfTanks; i++) {
            let tank = tanks[i];
            if(this.tanksDecelerate[tank.id] === true) {
                tank.decelerate();
            }
        }
    }   

    draw() {
        this.handleDeceleration();
        this.handleKeyPress();
    }
}