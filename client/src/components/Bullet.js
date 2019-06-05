
function returnPosByDirection(tank, direction) {
    let pos = createVector(tank.pos.x + direction.x * tank.radius, tank.pos.y + direction.y * tank.radius);
    return pos;
}

class Bullet {
    constructor(tank, speed, radius, color) {
        this.tank = tank;
        this.speed = speed;
        this.direction = p5.Vector.fromAngle(tank.angle + PI);
        this.pos = returnPosByDirection(tank, this.direction);   
        this.radius = radius;
        this.color = color;
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
        push();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.radius);
        pop();
    }
}