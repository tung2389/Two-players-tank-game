const ENTER_KEY = 13;
const U_KEY = 85;
const I_KEY = 73;
class GlobalHandler {
    constructor(sketch) {
        this.sketch = sketch;
        this.fireButtonPressed = false;
        this.throwGrenadeButtonPressed = false;
        this.throwSmokeButtonPressed = false;
        this.playerDecelerate = false;
    }

    getPlayerPos() {
        let pos = {
            x: player.pos.x,
            y: player.pos.y
        };
        return pos;
    }

    hanldeKeyTurn() {
        let direction = undefined;
        if(this.sketch.keyIsDown(this.sketch.LEFT_ARROW)) {
            direction = 'LEFT';
        }
        if(this.sketch.keyIsDown(this.sketch.RIGHT_ARROW)) {
            direction = 'RIGHT';
        }   
        if(direction !== undefined) {
            player.turn(direction);
            socketGlobalHandler.sendTurningAction(player.angle);
        }
    }

    handleKeyDecelerate() {
        if(this.sketch.keyIsDown(this.sketch.UP_ARROW) || this.sketch.keyIsDown(this.sketch.DOWN_ARROW)) {
            this.playerDecelerate = false;
        }
        else if(this.playerDecelerate === false){
            this.playerDecelerate = true;
        }
    }

    handleKeyAccelerate() {
        let direction = undefined;
        if(this.sketch.keyIsDown(this.sketch.UP_ARROW)) {
            direction = 'FORWARD';
        }
        if(this.sketch.keyIsDown(this.sketch.DOWN_ARROW)) {
            direction = 'BACKWARD';
        }
        if(direction !== undefined) {
            player.accelerate(direction);
            let pos = this.getPlayerPos();
            socketGlobalHandler.sendMovingAction(pos);
        }
    }

    handleKeyFire() {
        if(this.sketch.keyIsDown(ENTER_KEY)) {
            if(!this.fireButtonPressed) {
                bulletHandler.createBullet(player);
                socketGlobalHandler.sendShootingAction();
            }
            this.fireButtonPressed = true;
        }
        else {
            this.fireButtonPressed = false;
        }
    }
    handleKeyThrowBomb() {
        if(this.sketch.keyIsDown(U_KEY)) {
            if(!this.throwGrenadeButtonPressed) {
                grenadeHandler.createGrenade(player);
                socketGlobalHandler.sendThrowingGrenadeAction();
            }
            this.throwGrenadeButtonPressed = true;
        }
        else {
            this.throwGrenadeButtonPressed = false;
        }
        if(this.sketch.keyIsDown(I_KEY)) {
            if(!this.throwSmokeButtonPressed) {
                smokeHandler.createSmoke(player);
                socketGlobalHandler.sendThrowingSmokeAction();
            }
            this.throwSmokeButtonPressed = true;
        }
        else {
            this.throwSmokeButtonPressed = false;
        }
    }
    handleKeyPress() {
        this.hanldeKeyTurn();
        this.handleKeyDecelerate();
        this.handleKeyAccelerate();
        this.handleKeyFire();
        this.handleKeyThrowBomb();
    }

    handleDeceleration() {
        if(this.playerDecelerate === true) {
            player.decelerate();
            let pos = this.getPlayerPos();
            socketGlobalHandler.sendMovingAction(pos);
        }
    }
    
    gameEnded() {
        if(player.health > 0 && opponent.health > 0) {
            return false;
        }
        else {
            return true;
        }
    }

    displayTheResult(result) {
        this.sketch.push();
        this.sketch.textSize(30);
        this.sketch.fill('red');
        this.sketch.text(result, canvas.width / 2 - 100, 100);
        this.sketch.pop();
    }

    handleFinalResult() {
        if(player.health > 0) {
            this.displayTheResult('YOU WIN');
        }
        else {
            this.displayTheResult('YOU LOSE');
        }
    }
    draw() {
        this.handleDeceleration();
        this.handleKeyPress();
    }
}