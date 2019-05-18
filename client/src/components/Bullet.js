
function returnPosByDirection(direction) {
    let pos = createVector(player.pos.x + direction.x * player.radius, player.pos.y + direction.y * player.radius);
    return pos;
}

class Bullet {
    constructor(speed, radius, color) {
        this.speed = speed;
        this.direction = p5.Vector.fromAngle(player.angle + PI);
        this.pos = returnPosByDirection(this.direction, player.radius);   
        this.radius = radius;
        this.color = color;
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