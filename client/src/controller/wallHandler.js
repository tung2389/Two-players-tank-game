class WallHandler {
    constructor(map) {
        this.map = map;
        this.wallList = this.createListOfWallObjects();
    }

    createListOfWallObjects() {
        let wallList = [];
        for(let i = 0; i < this.map.length; i++) {
            let wallInfo = this.map[i];
            this.pushWallIntoArray(wallInfo, wallList);
        }
        return wallList;
    }

    pushWallIntoArray(wallInfo, wallList) {
        wallList.push(new Wall(
            wallInfo.x1,
            wallInfo.y1,
            wallInfo.x2,
            wallInfo.y2,
            4,         // The thickness of the wall
            'white'    // The color of the wall
        ));
    }

    getSlopeOfLine(x1, y1, x2, y2) {
        let slope = (y2 - y1) / (x2 - x1);
        return slope;
    }
    
    collideWithWall(bulletPos, wall) {
        let slopeOfBulletAndFirstPointOfWall = this.getSlopeOfLine(bulletPos.x, bulletPos.y, wall.x1, wall.y1);
        console.log(slopeOfBulletAndFirstPointOfWall, wall.slope);
        if(slopeOfBulletAndFirstPointOfWall === wall.slope) {
            return true;
        }
        else {
            return false;
        }
    }

    bulletCollideWithWall(bulletPos) {
        for(let i = 0; i < this.wallList.length; i++) {
            let wall = this.wallList[i];
            if(this.collideWithWall(bulletPos, wall)) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    draw() {
        for(let i = 0; i < this.wallList.length; i++) {
            let wall = this.wallList[i];
            wall.draw();
        }
    }
}