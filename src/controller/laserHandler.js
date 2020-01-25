class LaserHandler {
    constructor() {
        this.laserList = []
    }
    createLaser(id) {
        this.laserList.push(new Laser(
            20,
            id
        ))
    }
    draw() {
        for(let i = 0; i < this.laserList.length; i++) {
            let laser = this.laserList[i]
            laser.draw()
        }
    }
}