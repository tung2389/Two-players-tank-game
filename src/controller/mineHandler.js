class MineHandler {
    constructor() {
        this.mineList = []
    }
    createMine(id) {
        this.mineList.push(new Mine(
            10,         // Radius
            10,        // Speed
            400,       // Flying distance
            50,        // Exploding radius
            3,         // Exploding damage
            0.5,       // Exploding time
            id         // The id of the owner of the mine
        ));
    }
    removeMine(pos) {
        this.mineList.splice(pos, 1);
    }
    tankInsideExplodingRange(mine, tank) {
        if(sketch1.dist(mine.pos.x, mine.pos.y, tank.pos.x, tank.pos.y) 
            - mine.explodingRadius 
            - tank.radius
            - STROKE_WEIGHT < 0
            ) {
                return true;
            }
        else {
            return false;
        }
    }
    handleTankDamagedByExplosion(tank) {
        let i = 0;
        while(i < this.mineList.length) {
            let mine = this.mineList[i];
            if(mine.exploded) {
                if(!mine.doneExploding) {
                    if(this.tankInsideExplodingRange(mine, tank)) {
                        if(!mine.tankDamaged[tank.id]) {
                            tank.lostHealth(mine.explodingDamage);
                            mine.tankDamaged[tank.id] = true;
                        }
                    }
                    i++;
                }
                else {
                    this.removeMine(i);
                }
            }
            else {
                i++;
            }
        }
    }
    draw() {
        for(let i = 0; i < numberOfTanks; i++) {
            let tank = tanks[i];
            this.handleTankDamagedByExplosion(tank);
        }
        for(let i = 0; i < this.mineList.length; i++) {
            let mine = this.mineList[i];
            mine.draw();
        }
    }
}