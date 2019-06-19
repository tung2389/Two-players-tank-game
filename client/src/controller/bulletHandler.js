class BulletHandler {
    constructor(sketch) {
        this.sketch = sketch;
        this.player = player;
        this.opponent = opponent;
        this.bulletList = [];
    }

    createBullet(tank) {
        this.bulletList.push(new Bullet(
            tank,
            10, // Speed
            4,  // Radius
            tank.color,
            this.sketch
        ));
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
        return this.sketch.dist(bullet.pos.x, bullet.pos.y, tank.pos.x, tank.pos.y) 
            - tank.radius 
            - STROKE_WEIGHT 
            - bullet.radius;
    }

    typeOfBulletDifferentFromTheTankItCollidesWith(bullet, tank) {
        if(bullet.tank.type !== tank.type) {
            return true;
        }
        else {
            return false;
        }
    }

    bulletCollideWithOpponentTank(bullet) {
        if(this.distanceFromBulletToTank(bullet, opponent) < 0 && this.typeOfBulletDifferentFromTheTankItCollidesWith(bullet, opponent)) {
            return true;
        }
        else {
            return false;
        }
    }

    bulletCollideWithPlayerTank(bullet) {
        if(this.distanceFromBulletToTank(bullet, player) < 0 && this.typeOfBulletDifferentFromTheTankItCollidesWith(bullet, player)) {
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
            //let bulletPrevPos = bullet.getPrevPos();
            if(this.bulletCollideWithAxis(bullet) /*|| wallHandler.bulletCollideWithWall(bulletPrevPos, bullet.pos)*/) {
                this.removeBullet(i);
            }
            else if(this.bulletCollideWithPlayerTank(bullet)) {
                this.removeBullet(i);
                player.lostHealth(1);
            }
            else if(this.bulletCollideWithOpponentTank(bullet)) {
                this.removeBullet(i);
                opponent.lostHealth(1);
            }
            else {
                i++;
            }
        }
        for( let i = 0; i < this.bulletList.length; i++) {
            let bullet = this.bulletList[i];
            bullet.draw();
        }
    }
}