const ENTER_KEY = 13;

class GlobalHandler {
    constructor() {
        this.fireButtonPressed = false;
        this.decelerate = false;
        this.angle = player.angle;
        this.direction = undefined;
    }

    handleKeyPress() {
        if(keyIsDown(LEFT_ARROW)) {
            player.turn('LEFT');
        }
        if(keyIsDown(RIGHT_ARROW)) {
            player.turn('RIGHT');
        }
        if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
            this.decelerate = false;
        }
        else {
            this.decelerate = true;
            this.angle = player.angle;
        }
        if(keyIsDown(UP_ARROW)) {
            this.direction = 'FORWARD';
            player.accelerate('FORWARD');
        }
        if(keyIsDown(DOWN_ARROW)) {
            this.direction = 'BACKWARD';
            player.accelerate('BACKWARD');
        }
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

    draw() {
        this.handleKeyPress();
        if(this.decelerate === true) {
            player.decelerate(this.direction, this.angle);
        }
    }
}