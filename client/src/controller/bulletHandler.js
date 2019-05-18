class BulletHandler {
    constructor() {
        this.bulletList = [];
    }

    createBullet() {
        this.bulletList.push(new Bullet(
            10, // Speed
            10,  // Radius
            player.color
        ));
    }

    removeBullet(pos) {
        console.log(1);
        this.bulletList.splice(pos, 1);
    }

    draw() {
        let i = 0;
        while(i < this.bulletList.length) {
            let bulletPos = this.bulletList[i].pos;
            if( bulletPos.x < 0 ||
                bulletPos.y < 0 ||
                bulletPos.x > canvas.width ||
                bulletPos.y > canvas.height
            ) {
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