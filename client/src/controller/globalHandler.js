const ENTER_KEY = 13;

class GlobalHandler {
    constructor() {
        this.fireButtonPressed = false;
        this.decelerate = false;
    }

    hanldeKeyTurn() {
        if(keyIsDown(LEFT_ARROW)) {
            player.turn('LEFT');
        }
        if(keyIsDown(RIGHT_ARROW)) {
            player.turn('RIGHT');
        }   
    }

    handleKeyDecelerate() {
        if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            this.decelerate = false;
        }
        else {
            this.decelerate = true;
        }
    }

    handleKeyAccelerate() {
        if(keyIsDown(UP_ARROW)) {
            player.accelerate('FORWARD');
        }
        if(keyIsDown(DOWN_ARROW)) {
            player.accelerate('BACKWARD');
        }
    }

    handleKeyFire() {
        if(keyIsDown(ENTER_KEY)) {
            if(!this.fireButtonPressed) {
                bulletHandler.createBullet();
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

    draw() {
        this.handleKeyPress();
        if(this.decelerate === true) {
            player.decelerate();
        }
    }
}