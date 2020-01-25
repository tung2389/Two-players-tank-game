


class Utils {
    constructor() {
        
    }
    returnPosByDirection(tank, direction) {
        let pos = sketch1.createVector(tank.pos.x + direction.x * tank.radius, tank.pos.y + direction.y * tank.radius);
        return pos;
    }
    /**
     * 
     * @param {Object} point - A point with coordinates x,y
     * @param {Object} line  - An object containing a,b,c in line equation: ax + by + c = 0
     */
    calcDist(point, line) {
        let { x, y } = point
        let { a, b, c } = line
        let dist =  Math.abs(a * x + b * y + c) / (Math.sqrt(a * a + b * b))
        return dist
    }
    /**
     * 
     * @param {Object} line1 - An Object containing a1,b1,c1 in line equation: y = a1.x + b1.y + c1
     * @param {Object} line2 - An Object containing a2,b2,c2 in line equation: y = a2.x + b2.y + c2
     */
    calcIntersectingPoints(line1, line2) {
        // if(a1 * b2 - a2 * b1 = 0) => Two lines are paralell
        let {a1, b1, c1} = line1
        let {a2, b2, c2} = line2
        let x = (b1 * c2 - b2 * c1) / (a1 * b2 - a2 * b1)
        let y = (a2 * c1 - a1 * c2) / (a1 * b2 - a2 * b1)
        return {
            x: x,
            y: y
        }
    }
}