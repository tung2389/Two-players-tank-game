class GrenadeHandler {
    constructor() {
        this.grenadeList = [];
    }
    createGrenade(tank) {
        this.grenadeList.push(new Grenade(
            tank, // The owner of the grenade
            6,         // Radius
            10,        // Speed
            400,       // Flying distance
            100,         // Exploding radius
            3,         // Exploding damage
            6          // Number of mini bombs
        ))
    }
    removeGrenade(pos) {
        this.grenadeList.splice(pos, 1);
    }
    tankInsideExplodingRange(grenade, tank) {
        if(dist(grenade.pos.x, grenade.pos.y, tank.pos.x, tank.pos.y) 
            - grenade.explodingRadius 
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
        while(i < this.grenadeList.length) {
            let grenade = this.grenadeList[i];
            if(grenade.explodeNow()) {
                if(!grenade.doneExploding) {
                    if(this.tankInsideExplodingRange(grenade, tank)) {
                        tank.lostHealth(grenade.explodingDamage);
                    }
                    i++;
                }
                else {
                    console.log(2);
                    this.removeGrenade(i);
                }
            }
            else {
                i++;
            }
        }
    }
    draw() {
        this.handleTankDamagedByExplosion(player);
        this.handleTankDamagedByExplosion(opponent);
        for(let i = 0; i < this.grenadeList.length; i++) {
            let grenade = this.grenadeList[i];
            grenade.draw();
        }
    }
}