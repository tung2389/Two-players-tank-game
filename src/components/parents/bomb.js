class Bomb {
    constructor(radius, speed, flyingDistance, explodingRadius, explodingTime, id) {
        this.radius = radius;
        this.speed = speed;
        this.flyingDistance = flyingDistance;
        this.explodingRadius = explodingRadius;
        this.direction = p5.Vector.fromAngle(tanks[id].angle + sketch1.PI);
        this.originalPos = returnPosByDirection(tanks[id], this.direction); 
        this.pos = returnPosByDirection(tanks[id], this.direction); 
        this.explodingTime = explodingTime * FPS;
        this.doneExploding = false;
        this.playedSound = false;
        this.id = id;
    }
    handleMovement() {
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    }
    collideWithTanks() {
        for ( let i = 0; i < numberOfTanks; i++ ) {
            let tank = tanks[i];
            if(sketch1.dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y)
            - this.radius
            - tank.radius
            - STROKE_WEIGHT 
            < 0 
            && this.id !== tank.id
            ) {
                return true;
            }
        }
        return false;
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
        if(this.collideWithTanks() ||
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