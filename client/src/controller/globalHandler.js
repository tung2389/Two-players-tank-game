const ENTER_KEY = 13;

class GlobalHandler {
    constructor(tank) {
        this.tank = tank;
        this.fireButtonPressed = false;
        this.playerDecelerate = false;
    }
    
    hanldeKeyTurn() {
        let direction = undefined;
        if(keyIsDown(LEFT_ARROW)) {
            direction = 'LEFT';
        }
        if(keyIsDown(RIGHT_ARROW)) {
            direction = 'RIGHT';
        }   
        if(direction !== undefined) {
            player.turn(direction);
            socketGlobalHandler.sendTurningAction(player.angle);
        }
    }

    handleKeyDecelerate() {
        if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            this.playerDecelerate = false;
        }
        else if(this.playerDecelerate === false){
            this.playerDecelerate = true;
        }
    }

    handleKeyAccelerate() {
        let direction = undefined;
        if(keyIsDown(UP_ARROW)) {
            direction = 'FORWARD';
        }
        if(keyIsDown(DOWN_ARROW)) {
            direction = 'BACKWARD';
        }
        if(direction !== undefined) {
            player.accelerate(direction);
            let pos = {
                x: player.pos.x,
                y: player.pos.y
            };
            socketGlobalHandler.sendMovingAction(pos);
        }
    }

    handleKeyFire() {
        if(keyIsDown(ENTER_KEY)) {
            if(!this.fireButtonPressed) {
                playerBulletHandler.createBullet();
                socketGlobalHandler.sendShootingAction();
            }
            this.fireButtonPressed = true;
        }
        else {
            this.fireButtonPressed = false;
        }
    }

    handleKeyPress() {
        this.hanldeKeyTurn();
        this.handleKeyDecelerate();
        this.handleKeyAccelerate();
        this.handleKeyFire();
    }

    handleDeceleration() {
        if(this.playerDecelerate === true) {
            player.decelerate();
            let pos = {
                x: player.pos.x,
                y: player.pos.y
            };
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
        push();
        textSize(30);
        fill('red');
        text(result, canvas.width / 2 - 100, 100);
        pop();
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