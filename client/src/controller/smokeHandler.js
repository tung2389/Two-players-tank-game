class SmokeHandler extends ReloadingHandler {
    constructor(amountPerTime, reloadingTime) {
        super(amountPerTime, reloadingTime);
        this.smokeList = [];
    }
    createSmoke(tank) {
        if(this.amount > 0) {
            this.smokeList.push(new Smoke(
                tank,      // The owner of the smoke
                6,         // Radius
                10,        // Speed
                400,       // Flying distance
                200,       // Exploding radius
                0.5,       // Emitting speed  
                2          // Exploding time
            ));
            this.decreaseAmount();
        }
    }
    removeSmoke(pos) {
        this.smokeList.splice(pos, 1);
    }
    handleExistenceOfSmokes() {
        let i = 0;
        while(i < this.smokeList.length) {
            let smokeBomb = this.smokeList[i];
            if(smokeBomb.doneExploding) {
                this.removeSmoke(i);
            }
            else {
                i++;
            }
        }
    }
    draw() {
        this.handleExistenceOfSmokes();
        for(let i = 0; i < this.smokeList.length; i++) {
            let smokeBomb = this.smokeList[i];
            smokeBomb.draw();
        }
        // this.drawReloading();
    }
}