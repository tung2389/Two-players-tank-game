class Tank  {
    constructor(x, y, radius, speed, maxSpeed, acceleratingSpeed, turnSpeed) {
        this.pos = createVector(x,y);
        this.radius = radius;
        this.speed = speed;
        this.maxSpeed = maxSpeed;
        this.acceleratingSpeed = acceleratingSpeed;
        this.turnSpeed = turnSpeed;
    }
    draw() {
        push();
        circle(this.pos.x, this.pos.y, this.radius);
        pop();
    }
}