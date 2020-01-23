class BulletHandler extends ReloadingHandler {
    constructor(amountPerTime, reloadingTime) {
        super(amountPerTime, reloadingTime);
        this.bulletList = [];
    }

    createBullet(id, bullet = new Bullet(
                                10, // Speed
                                4,  // Radius
                                tanks[id].color, 
                                id, // Tank's id
                            ))
    {
        this.bulletList.push(bullet);
        // if(tank.type === player.type) {
        //     this.decreaseAmount();
        // }
    }

    removeBullet(pos) {
        this.bulletList.splice(pos, 1);
    }

    bulletCollideWithAxis(bullet) {
        if( bullet.pos.x - bullet.radius < 0 ||
            bullet.pos.y - bullet.radius < 0 ||
            bullet.pos.x + bullet.radius > canvas.width ||
            bullet.pos.y + bullet.radius > canvas.height
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    distanceFromBulletToTank(bullet, tank) {
        return sketch1.dist(bullet.pos.x, bullet.pos.y, tank.pos.x, tank.pos.y) 
            - tank.radius 
            - STROKE_WEIGHT 
            - bullet.radius;
    }

    bulletCollideWithTanks(bullet, tank) {
        if(this.distanceFromBulletToTank(bullet, tank) < 0 && bullet.id !== tank.id) {
            return true;
        }
        else {
            return false;
        }
    }

    draw() {
        let i = 0;
        while(i < this.bulletList.length) {
            let bullet = this.bulletList[i];
            let removeBullet = false;
            if(this.bulletCollideWithAxis(bullet) /*|| wallHandler.bulletCollideWithWall(bulletPrevPos, bullet.pos)*/) {
                this.removeBullet(i);
                removeBullet = true;
            }
            for( let id = 0; id < numberOfTanks; id++ ) {
                let tank = tanks[id];
                if(this.bulletCollideWithTanks(bullet, tank)) {
                    this.removeBullet(i)
                    tank.lostHealth(1)
                    removeBullet = true;
                }
            }
            if(!removeBullet) {
                i++;
            }
        }
        for( let i = 0; i < this.bulletList.length; i++) {
            let bullet = this.bulletList[i];
            bullet.draw();
        }
        // this.drawReloading();
    }
}