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

    constrainSpeed() {
        if(this.currentSpeed.mag() > this.maxSpeed) {
            let currentVector = this.currentSpeed;
            currentVector.normalize(); // vector's length equal to 1 without changing the ratio between x and y
            this.currentSpeed.x = currentVector.x * this.maxSpeed;
            this.currentSpeed.y = currentVector.y * this.maxSpeed;
        }
    }

    turn() {
        this.angle += this.turnSpeed;
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
        handleX();
        handleY();
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