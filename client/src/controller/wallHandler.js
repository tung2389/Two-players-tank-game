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

    sideOfWallTheBulletLieOn(bulletPos, wall) {
        console.log(bulletPos);
        return (bulletPos.x - wall.x1) * (wall.y2 - wall.y1) - (bulletPos.y - wall.y1) * (wall.x2 - wall.x1);
    }

    bulletCollideWithWall(prevBulletPos, bulletPos) {
        for(let i = 0; i < this.wallList.length; i++) {
            let wall = this.wallList[i];
            if(this.sideOfWallTheBulletLieOn(prevBulletPos, wall) * this.sideOfWallTheBulletLieOn(bulletPos, wall) < 0) {
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