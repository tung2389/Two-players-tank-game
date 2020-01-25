class Laser {
    constructor(width, id) {
        this.width = width
        this.id = id
        this.tankPos = {x: tanks[id].pos.x, y: tanks[id].pos.y}
        this.intialAngle = tanks[id].angle
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
    calcSectPointLaserVsWalls(startingPos, direction) {
        let { x, y } = direction 
        let slope = y/x;
        let y0 = startingPos.y - slope * startingPos.x
        let laser = {a1: slope, b1: -1, c1: y0}
        let intersectingPoint
        // When the vector point into one of these four quadrants, there will be two lines that 
        // it can intersect. Therefore, we need two "if" statements to see eliminate the line
        // whose intersection is out of border.
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
            intersectingPoint = {x: startingPos.x, y: 0}
        else if( y === 0 && x < 0)
            intersectingPoint = {x: 0, y: y0}
        else if( x === 0 && y > 0)
            intersectingPoint = {x: startingPos.x, y: canvas.height}
        return intersectingPoint
    }
    //Bug
    draw() {
        let firstDestination = this.calcSectPointLaserVsWalls(this.startingPos, this.direction)
        let secondAngle
        if(firstDestination.x === 0 || firstDestination.x === canvas.width)
            secondAngle = -(sketch1.PI + this.intialAngle)
        else if(firstDestination.y === 0 || firstDestination.y === canvas.height) 
            secondAngle = -this.intialAngle
        let secondDestination = this.calcSectPointLaserVsWalls(firstDestination, p5.Vector.fromAngle(secondAngle))
        sketch1.push()
        sketch1.strokeWeight(this.width)
        sketch1.line(this.startingPos.x, this.startingPos.y, firstDestination.x, firstDestination.y)
        sketch1.line(firstDestination.x, firstDestination.y, secondDestination.x, secondDestination.y)
        sketch1.pop()
    }
}