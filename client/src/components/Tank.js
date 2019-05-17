class Tank  {
    constructor(x, y, radius, maxSpeed, acceleratingSpeed, turnSpeed, color) {
        this.pos = createVector(x, y);
        this.currentSpeed = createVector(0, 0);
        this.radius = radius;
        this.maxSpeed = maxSpeed;
        this.acceleratingSpeed = acceleratingSpeed;
        this.turnSpeed = turnSpeed;
        this.color = color;
        this.angle = 2*PI;
    }

    turn(direction) {
        this.angle += direction === 'LEFT' ? -this.turnSpeed : this.turnSpeed;
    }
    
    accelerate() {
        let currentAngle = p5.Vector.fromAngle(this.angle); // Create a vector with the length equals to 1 from angle
        this.currentSpeed.x += currentAngle.x * this.acceleratingSpeed;
        this.currentSpeed.y += currentAngle.y * this.acceleratingSpeed;
        this.constrainSpeed();
    }

    constrainSpeed() {
        if(this.currentSpeed.mag() > this.maxSpeed) {
            let currentVector = this.currentSpeed;
            currentVector.normalize(); // vector's length equal to 1 without changing the ratio between x and y
            this.currentSpeed.x = currentVector.x * this.maxSpeed;
            this.currentSpeed.y = currentVector.y * this.maxSpeed;
        }
    }


    handleX() {
        this.pos.x += this.currentSpeed.x;
        this.pos.x = this.pos.x > canvas.width ? canvas.width : this.pos.x;
        this.pos.x = this.pos.x < 0 ? 0 : this.pos.x;
    }

    handleY() {
        this.pos.y += this.currentSpeed.y;
        this.pos.y = this.pos.y > canvas.height ? canvas.height : this.pos.y;
        this.pos.y = this.pos.y < 0 ? 0 : this.pos.y;
    }

    handleMovement() {
        this.handleX();
        this.handleY();
    }


    drawCircle() {
        circle(0, 0, this.radius);
    }

    drawArrow() {
        line(0, this.radius / 4, -3 * this.radius / 8, 0);
        line(0, -this.radius / 4, -3 * this.radius / 8, 0);
    }

    drawColor() {
        strokeWeight(4);
        stroke(this.color);
        fill("black");
    }

    drawTank() {
        translate(this.pos.x, this.pos.y);
        rotate(this.angle); // Rotate around origin (pos.x, pos.y). This is the reason why we must call translate first
        this.drawColor();
        this.drawCircle();
        this.drawArrow();
    }

    draw() {
        push();
        this.handleMovement();
        this.drawTank();
        pop();
    }
}