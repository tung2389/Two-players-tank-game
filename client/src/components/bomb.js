class Bomb {
    constructor(tank, radius, speed, flyingDistance, explodingRadius, explodingTime) {
        this.tank = tank;
        this.radius = radius;
        this.speed = speed;
        this.flyingDistance = flyingDistance;
        this.explodingRadius = explodingRadius;
        this.direction = p5.Vector.fromAngle(tank.angle + sketch1.PI);
        this.originalPos = returnPosByDirection(tank, this.direction); 
        this.pos = returnPosByDirection(tank, this.direction); 
        this.explodingTime = explodingTime * FPS;
        this.doneExploding = false;
    }
    handleMovement() {
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    }
    collideWithTank(tank) {
        if(sketch1.dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y)
           - this.radius
           - tank.radius
           - STROKE_WEIGHT 
           < 0 
           && this.tank.id !== tank.id
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    collideWithAxis() {
        if(
            this.pos.x - this.radius < 0 ||
            this.pos.y - this.radius < 0 ||
            this.pos.x + this.radius > canvas.width ||
            this.pos.y + this.radius > canvas.height
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    cannotFlyAnymore() {
        if(sketch1.dist(this.pos.x, this.pos.y, this.originalPos.x, this.originalPos.y) >= this.flyingDistance) {
            return true;
        }
        else {
            return false;
        }
    }
    explodeNow() {
        if(this.collideWithTank(opponent) ||
           this.collideWithTank(player) ||
           this.collideWithAxis() ||
           this.cannotFlyAnymore()
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    handleExplodingTime() {
        if(this.explodingTime > 0) {
            this.explodingTime -= 1;
        }
        else {
            this.doneExploding = true;
        }
    }
}