class Bullet {
    constructor(speed, radius, color, id) {
        this.speed = speed;
        this.direction = p5.Vector.fromAngle(tanks[id].angle);
        this.pos = utils.returnPosByDirection(tanks[id], this.direction);   
        this.radius = radius;
        this.color = color;
        this.id = id;
        // gunSound.play();
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
        sketch1.push();
        sketch1.fill(this.color);
        sketch1.circle(this.pos.x, this.pos.y, this.radius);
        sketch1.pop();
    }
}