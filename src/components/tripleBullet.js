
class TripleBullet {
    constructor(id) {
        this.id = id;
        this.bulletList = []
        for(let i = 1; i <= 3; i++) {
            this.bulletList.push(new Bullet(
                10,
                4,
                tanks[id].color, 
                id, 
            ))
        }
        this.angleList = [sketch1.PI / 18, 0, -sketch1.PI / 18]
        // gunSound.play();
    }
    rotateBulletsFromDefaultAngle() {
        for(let i = 0; i < 3; i++) {
            let defaultAngle = tanks[this.id].angle
            this.bulletList[i].direction = p5.Vector.fromAngle(defaultAngle + this.angleList[i])
        }
    }
    
    draw() {
        this.rotateBulletsFromDefaultAngle()
        for(let i = 0; i < 3; i++) {
            bulletHandler.createBullet(this.id, this.bulletList[i])
        }
    }
}