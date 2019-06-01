class WallHandler {
    constructor(map) {
        this.map = map;
    }

    getSlopeOfLine(x1, y1, x2, y2) {
        let slope = (y2 - y1) / (x2 - x1);
        return slope;
    }
    
    collideWithWall(bulletPos, wall) {
        if(wall.type === 'custom') {
            let slopeOfBulletAndFirstPointOfWall = this.getSlopeOfLine(bulletPos.x, bulletPos.y, wall.x1, wall.y1);
            if(slopeOfBulletAndFirstPointOfWall === wall.slope) {
                return true;
            }
            else {
                return;
            }
        }
    }

    bulletCollideWithWall(bulletPos) {
        for(let i = 0; i < map.length; i++) {
            let wall = map[i];
            if(this.collideWithWall(bulletPos, wall)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    draw() {
        for(let i = 0; i < map.length; i++) {
            let wall = map[i];
            wall.draw();
        }
    }
}