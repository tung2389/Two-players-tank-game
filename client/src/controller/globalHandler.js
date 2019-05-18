class GlobalHandler {
    constructor() {

    }

    handleKeyPress() {
        if(keyIsDown(LEFT_ARROW)) {
            player.turn('LEFT');
        }
        if(keyIsDown(RIGHT_ARROW)) {
            player.turn('RIGHT');
        }
        if(keyIsDown(UP_ARROW)) {
            player.accelerate('FORWARD');
        }
        // else {
        //     player.decelerate();
        // }
        if(keyIsDown(DOWN_ARROW)) {
            player.accelerate('BACKWARD');
        }
        // else {
        //     player.decelerate();
        // }
    }

    draw() {
        this.handleKeyPress();
    }
}