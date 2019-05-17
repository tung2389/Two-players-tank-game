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
    }

    draw() {
        this.handleKeyPress();
    }
}