
function returnPosByDirection(tank, direction, sketch) {
    let pos = sketch.createVector(tank.pos.x + direction.x * tank.radius, tank.pos.y + direction.y * tank.radius);
    return pos;
}

class Bullet {
    constructor(tank, speed, radius, color, sketch) {
        this.tank = tank;
        this.speed = speed;
        this.direction = p5.Vector.fromAngle(tank.angle + sketch.PI);
        this.pos = returnPosByDirection(tank, this.direction, sketch);   
        this.radius = radius;
        this.color = color;
        this.sketch = sketch;
    }

    getPrevPos() {
        return {
            x: this.pos.x - this.direction.x * this.speed,
            y: this.pos.y - this.direction.y * this.speed
        };
    }

    handleMovement() {
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    }

    draw() {
        this.handleMovement();
        this.sketch.push();
        this.sketch.fill(this.color);
        this.sketch.circle(this.pos.x, this.pos.y, this.radius);
        this.sketch.pop();
    }
}