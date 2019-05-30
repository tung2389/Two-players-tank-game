const ENTER_KEY = 13;

class GlobalHandler {
    constructor(tank) {
        this.tank = tank;
        this.fireButtonPressed = false;
        this.playerDecelerate = false;
        this.opponentDecelerate = false;
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
            socketGlobalHandler.sendTurningAction(direction);
        }
    }

    handleKeyDecelerate() {
        if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            this.playerDecelerate = false;
            socketGlobalHandler.sendStoppingDeceleratingAction();
        }
        else if(this.playerDecelerate === false){
            this.playerDecelerate = true;
            socketGlobalHandler.sendDeceleratingAction();
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
            socketGlobalHandler.sendAcceleratingAction(direction);
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

    opponentTankDecelerate() {
        this.opponentDecelerate = true;
    }

    opponentTankStopDecelerating() {
        this.opponentDecelerate = false;
    }

    handleTwoTanksDeceleration() {
        if(this.playerDecelerate === true) {
            player.decelerate();
        }
        if(this.opponentDecelerate === true) {
            opponent.decelerate();
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
        this.handleTwoTanksDeceleration();
        this.handleKeyPress();
    }
}