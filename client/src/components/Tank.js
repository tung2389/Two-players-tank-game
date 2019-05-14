class Tank  {
    constructor(x, y, radius, speed, maxSpeed, acceleratingSpeed, turnSpeed, color) {
        this.pos = createVector(x,y);
        this.radius = radius;
        this.speed = speed;
        this.maxSpeed = maxSpeed;
        this.acceleratingSpeed = acceleratingSpeed;
        this.turnSpeed = turnSpeed;
        this.color = color;
    }
    draw() {
        push();
        strokeWeight(4);
        stroke(this.color);
        fill("black");
        circle(this.pos.x, this.pos.y, this.radius);
        pop();
    }
}