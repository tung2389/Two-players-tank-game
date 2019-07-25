const ENTER_KEY = 13;
const U_KEY = 85;
const I_KEY = 73;
class GlobalHandler {
    constructor() {
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
        if(sketch1.keyIsDown(sketch1.LEFT_ARROW)) {
            direction = 'LEFT';
        }
        if(sketch1.keyIsDown(sketch1.RIGHT_ARROW)) {
            direction = 'RIGHT';
        }   
        if(direction !== undefined) {
            player.turn(direction);
            socketGlobalHandler.sendTurningAction(player.angle);
        }
    }

    handleKeyDecelerate() {
        if(sketch1.keyIsDown(sketch1.UP_ARROW) || sketch1.keyIsDown(sketch1.DOWN_ARROW)) {
            this.playerDecelerate = false;
        }
        else if(this.playerDecelerate === false){
            this.playerDecelerate = true;
        }
    }

    handleKeyAccelerate() {
        let direction = undefined;
        if(sketch1.keyIsDown(sketch1.UP_ARROW)) {
            direction = 'FORWARD';
        }
        if(sketch1.keyIsDown(sketch1.DOWN_ARROW)) {
            direction = 'BACKWARD';
        }
        if(direction !== undefined) {
            player.accelerate(direction);
            let pos = this.getPlayerPos();
            socketGlobalHandler.sendMovingAction(pos);
        }
    }

    handleKeyFire() {
        if(sketch1.keyIsDown(ENTER_KEY)) {
            if(!this.fireButtonPressed) {
                if(bulletHandler.amount > 0) {
                    bulletHandler.createBullet(player);
                    socketGlobalHandler.sendShootingAction();
                }
            }
            this.fireButtonPressed = true;
        }
        else {
            this.fireButtonPressed = false;
        }
    }

    handleKeyThrowGrenade() {
        if(sketch1.keyIsDown(U_KEY)) {
            if(!this.throwGrenadeButtonPressed) {
                if(grenadeHandler.amount > 0)
                {
                    grenadeHandler.createGrenade(player);
                    socketGlobalHandler.sendThrowingGrenadeAction();
                }
            }
            this.throwGrenadeButtonPressed = true;
        }
        else {
            this.throwGrenadeButtonPressed = false;
        }
    }

    handleKeyThrowSmoke() {
        if(sketch1.keyIsDown(I_KEY)) {
            if(!this.throwSmokeButtonPressed) {
                if(smokeHandler.amount > 0) {
                    smokeHandler.createSmoke(player);
                    socketGlobalHandler.sendThrowingSmokeAction();
                }
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
        this.handleKeyThrowGrenade();
        this.handleKeyThrowSmoke();
    }

    handleDeceleration() {
        if(this.playerDecelerate === true) {
            let canDecelerate = player.decelerate();
            if(canDecelerate === true) {
                let pos = this.getPlayerPos();
                socketGlobalHandler.sendMovingAction(pos);
            }
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
        sketch1.push();
        sketch1.textSize(30);
        sketch1.fill('red');
        sketch1.text(result, canvas.width / 2 - 100, 100);
        sketch1.pop();
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