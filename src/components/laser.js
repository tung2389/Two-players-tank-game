class Laser {
    constructor(width, id) {
        this.width = width
        this.id = id
        this.tankPos = {x: tanks[id].pos.x, y: tanks[id].pos.y}
        this.direction = p5.Vector.fromAngle(tanks[id].angle);
        this.startingPos = utils.returnPosByDirection(tanks[id], this.direction)
        this.slope = this.direction.y / this.direction.x
    }
    getEquationOfLine() {
        let y0 = this.startingPos.y
        return {
            a: this.slope,
            b: -1,
            c: y0
        }
    }
    calcSectPointLaserVsWalls() {
        let { x, y} = this.direction 
        let y0 = this.tankPos.y - this.slope * this.tankPos.x
        let laser = {a1: this.slope, b1: -1, c1: y0}
        let intersectingPoint
        if(x > 0 && y < 0){  //Quadrant 1
            intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 1, b2: 0, c2: -canvas.width})
            if(intersectingPoint.y < 0) {
                intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 0, b2: 1, c2: 0})
            }
        }
        else if(x < 0 && y < 0) {   //Quadrant 2
            intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 0, b2: 1, c2: 0})
            if(intersectingPoint.x < 0) {
                intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 1, b2: 0, c2: 0})
            }
        }
        else if(x < 0 && y > 0) {   //Quadrant 3
            intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 1, b2: 0, c2: 0})
            if(intersectingPoint.y > canvas.height) {
                intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 0, b2: 1, c2: -canvas.height})
            }
        }
        else if(x > 0 && y > 0) {   //Quadrant 4
            intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 0, b2: 1, c2: -canvas.height})
            if(intersectingPoint.x > canvas.width) {
                intersectingPoint = utils.calcIntersectingPoints(laser, {a2: 1, b2: 0, c2: -canvas.width})
            }
        }
        else if( y === 0 && x > 0)
            intersectingPoint = {x: canvas.width, y: y0}
        else if( x === 0 && y < 0)
            intersectingPoint = {x: this.startingPos.x, y: 0}
        else if( y === 0 && x < 0)
            intersectingPoint = {x: 0, y: y0}
        else if( x === 0 && y > 0)
            intersectingPoint = {x: this.startingPos.x, y: canvas.height}
        return intersectingPoint
    }
    draw() {
        let test = this.calcSectPointLaserVsWalls()
        sketch1.push()
        sketch1.strokeWeight(this.width)
        sketch1.line(this.startingPos.x, this.startingPos.y, test.x, test.y)
        sketch1.pop()
    }
}