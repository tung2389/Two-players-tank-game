class ResultHandler {
    constructor() {
        this.gameEnded = false;
    }

    displayTheResult(result, color) {
        sketch1.push();
        sketch1.textSize(30);
        sketch1.fill(color);
        sketch1.text(result, canvas.width / 2 - 100, 100);
        sketch1.pop();
    }
    
    draw() {
        let deathTank = 0;
        let winTank;
        for( let i = 0; i < numberOfTanks; i++) {
            let tank = tanks[i];
            if(tank.health <= 0) {
                deathTank++;
            }
            else {
                winTank = tank;
            }
        }
        if(deathTank === numberOfTanks - 1) {
            this.displayTheResult(winTank.color + " is the winner", winTank.color);
            this.gameEnded = true;
        }
    }
}