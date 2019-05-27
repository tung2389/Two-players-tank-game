class BulletHandler {
    constructor(tank) {
        this.tank = tank;
        this.bulletList = [];
    }

    createBullet() {
        this.bulletList.push(new Bullet(
            this.tank,
            10, // Speed
            10,  // Radius
            this.tank.color
        ));
    }

    removeBullet(pos) {
        console.log(1);
        this.bulletList.splice(pos, 1);
    }

    isBulletCollideWithAxis(bulletPos) {
        if( bulletPos.x < 0 ||
            bulletPos.y < 0 ||
            bulletPos.x > canvas.width ||
            bulletPos.y > canvas.height
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    
    draw() {
        let i = 0;
        while(i < this.bulletList.length) {
            let bulletPos = this.bulletList[i].pos;
            if(this.isBulletCollideWithAxis(bulletPos)) {
                this.removeBullet(i);
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