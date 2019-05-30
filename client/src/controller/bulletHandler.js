class BulletHandler {
    constructor(player, opponent) {
        this.player = player;
        this.opponent = opponent;
        this.bulletList = [];
    }

    createBullet() {
        this.bulletList.push(new Bullet(
            this.player,
            10, // Speed
            10,  // Radius
            this.player.color
        ));
    }

    removeBullet(pos) {
        this.bulletList.splice(pos, 1);
    }

    bulletCollideWithAxis(bullet) {
        if( bullet.pos.x < 0 ||
            bullet.pos.y < 0 ||
            bullet.pos.x > canvas.width ||
            bullet.pos.y > canvas.height
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    bulletCollideWithOpponentTank(bullet) {
        if(dist(bullet.pos.x, bullet.pos.y, this.opponent.pos.x, this.opponent.pos.y) 
            - this.opponent.radius 
            - STROKE_WEIGHT 
            - bullet.radius < 0
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
            let bullet = this.bulletList[i];
            if(this.bulletCollideWithAxis(bullet)) {
                this.removeBullet(i);
            }
            else if(this.bulletCollideWithOpponentTank(bullet)) {
                this.removeBullet(i);
                this.opponent.lostHealth(1);
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