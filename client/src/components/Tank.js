const STROKE_WEIGHT = 4;
const GUN_LENGTH = 20;

class Tank  {
    constructor(x, y, angle, radius, maxSpeed, acceleratingSpeed, deceleratingSpeed, turnSpeed, color, type, health, id) {
        this.pos = sketch1.createVector(x, y);
        this.currentSpeed = sketch1.createVector(0, 0);
        this.radius = radius;
        this.angle = angle;
        this.maxSpeed = maxSpeed;
        this.acceleratingSpeed = acceleratingSpeed;
        this.deceleratingSpeed = deceleratingSpeed;
        this.turnSpeed = turnSpeed;
        this.color = color;
        this.type = type;
        this.health = health;
        this.id = id;
    }

    turn(direction) {
        this.angle += direction === 'LEFT' ? -this.turnSpeed : this.turnSpeed;
    }
    
    accelerate(direction) {
        // Create a vector of direction with the length equals to 1 from angle, +PI because the gap between the initial 
        // angle and the 0 angle is PI.
        let currentAngle = p5.Vector.fromAngle(this.angle + sketch1.PI);
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
        return sketch1.createVector(this.currentSpeed.x, this.currentSpeed.y).normalize();
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
        if(pos + radius + STROKE_WEIGHT > limit) {
            this.currentSpeed[axis] = 0;
            return limit - radius - STROKE_WEIGHT; 
        }
        else if(pos - radius - STROKE_WEIGHT < 0) {
            this.currentSpeed[axis] = 0;
            return radius + STROKE_WEIGHT;
        }
        else {
            return pos;
        }
    }
    
    collideWithOpponentTank(x,y) {
        if(sketch1.dist(x, y, opponent.pos.x, opponent.pos.y) - 2 * STROKE_WEIGHT - this.radius - opponent.radius < 0) {
            return true;
        }
        else {
            return false;
        }
    }

    handleX() {
        let oldPosX = this.pos.x;
        this.pos.x += this.currentSpeed.x;
        let newPosX = this.pos.x;
        if(this.collideWithOpponentTank(oldPosX, this.pos.y) === false && this.collideWithOpponentTank(newPosX, this.pos.y) === true) {
            this.pos.x = oldPosX;
        }
        this.pos.x = this.handleCollisionWithAxis(this.pos.x, this.radius, canvas.width, 'x');
    }

    handleY() {
        let oldPosY = this.pos.y;
        this.pos.y += this.currentSpeed.y;
        let newPosY = this.pos.y;
        if(this.collideWithOpponentTank(this.pos.x, oldPosY) === false && this.collideWithOpponentTank(this.pos.x, newPosY) === true) {
            this.pos.y = oldPosY;
        }
        this.pos.y = this.handleCollisionWithAxis(this.pos.y, this.radius, canvas.height, 'y');
    }

    handleMovement() {
        this.handleX();
        this.handleY();
    }

    lostHealth(damage) {
        this.health -= damage;
        if(this.health < 0) {
            this.health = 0;
        }
    }

    moveToPos(pos) {
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    }

    turnTo(angle) {
        this.angle = angle;
    }

    drawCircle() {
        sketch1.circle(0, 0, this.radius * 2);
    }

    drawGun() {
        sketch1.line(0, 0, -GUN_LENGTH, 0);
    }

    drawColor() {
        sketch1.strokeWeight(STROKE_WEIGHT);
        sketch1.stroke(this.color);
        sketch1.fill("white");
    }

    drawTank() {
        sketch1.translate(this.pos.x, this.pos.y);
        sketch1.rotate(this.angle); // Rotate around origin (pos.x, pos.y). This is the reason why we must call translate first
        this.drawColor();
        this.drawCircle();
        this.drawGun();
    }
    draw() {
        this.handleMovement();
        sketch1.push();
        this.drawTank();
        sketch1.pop();
    }
}