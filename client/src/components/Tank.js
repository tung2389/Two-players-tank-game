class Tank  {
    constructor(x, y, radius, angle, maxSpeed, acceleratingSpeed, deceleratingSpeed, turnSpeed, color) {
        this.pos = createVector(x, y);
        this.currentSpeed = createVector(0, 0);
        this.radius = radius;
        this.angle = angle;
        this.maxSpeed = maxSpeed;
        this.acceleratingSpeed = acceleratingSpeed;
        this.deceleratingSpeed = deceleratingSpeed;
        this.turnSpeed = turnSpeed;
        this.color = color;
    }

    turn(direction) {
        this.angle += direction === 'LEFT' ? -this.turnSpeed : this.turnSpeed;
    }
    
    accelerate(direction) {
        // Create a vector of direction with the length equals to 1 from angle, +PI because the gap between the initial 
        // angle and the 0 angle is PI.
        let currentAngle = p5.Vector.fromAngle(this.angle + PI);
        let accelerateX = currentAngle.x * this.acceleratingSpeed;
        let accelerateY = currentAngle.y * this.acceleratingSpeed;
        this.currentSpeed.x += direction === 'FORWARD' ? accelerateX : -accelerateX;
        this.currentSpeed.y += direction === 'FORWARD' ? accelerateY : -accelerateY;
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

    decelerate() {
        if( this.currentSpeed.x !== 0 || this.currentSpeed.y !== 0) {
            let currentAngleMovement = this.createDirectionOfCurrentMovement();
            this.handleDeceleratingSpeedXY(currentAngleMovement);
        }
    }

    createDirectionOfCurrentMovement () {
        return createVector(this.currentSpeed.x, this.currentSpeed.y).normalize();
    }

    handleDeceleratingSpeedXY (currentAngle) {
        this.currentSpeed.x = this.caculateSpeedAfterDecelerating(this.currentSpeed.x, currentAngle.x * this.deceleratingSpeed);
        this.currentSpeed.y = this.caculateSpeedAfterDecelerating(this.currentSpeed.y, currentAngle.y * this.deceleratingSpeed);
    }

    caculateSpeedAfterDecelerating(currentSpeed, deceleratingSpeed) {
        if(this.deceleratingSpeedExceedCurrentSpeed(currentSpeed, deceleratingSpeed)) {
            return 0;
        }
        else {
            return currentSpeed - deceleratingSpeed;
        }
    }

    // Decide whether the player can still decelerate
    deceleratingSpeedExceedCurrentSpeed(currentSpeed, deceleratingSpeed) {
        if( (currentSpeed - deceleratingSpeed) * currentSpeed <= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    // Handle collision of the tank with the x-axis or the y-axis
    handleCollisionWithAxis(pos, radius, limit, axis) {
        if(pos + radius > limit) {
            this.currentSpeed[axis] = 0;
            return limit - radius; 
        }
        else if(pos - radius < 0) {
            this.currentSpeed[axis] = 0;
            return radius;
        }
        else {
            return pos;
        }
    }

    handleX() {
        this.pos.x += this.currentSpeed.x;
        this.pos.x = this.handleCollisionWithAxis(this.pos.x, this.radius, canvas.width, 'x');
    }

    handleY() {
        this.pos.y += this.currentSpeed.y;
        this.pos.y = this.handleCollisionWithAxis(this.pos.y, this.radius, canvas.height, 'y');
    }

    handleMovement() {
        this.handleX();
        this.handleY();
    }


    drawCircle() {
        circle(0, 0, this.radius * 2);
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