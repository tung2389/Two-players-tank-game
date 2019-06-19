class SmokeHandler {
    constructor(sketch) {
        this.sketch = sketch;
        this.smokeList = [];
    }
    createSmoke(tank) {
        this.smokeList.push(new Smoke(
            tank,      // The owner of the smoke
            6,         // Radius
            10,        // Speed
            400,       // Flying distance
            200,       // Exploding radius
            0.5,       // Emitting speed  
            2,          // Exploding time
            this.sketch
        ));
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
    }
}