class Smoke extends Bomb {
    constructor(tank, radius, speed, flyingDistance, explodingRadius, emittingSpeed, explodingTime) {
        super(tank, radius, speed, flyingDistance, explodingRadius, explodingTime);
        this.emittingSpeed = emittingSpeed;
        this.coveringRadius = 0;
    };
    extendCoveringRadius() {
        this.coveringRadius += this.emittingSpeed;
    }
    explode() {
        sketch1.push();
        sketch1.fill('yellow');
        sketch1.circle(this.pos.x, this.pos.y, this.coveringRadius * 2);
        sketch1.pop();
    }
    reachMaximumRadius() {
        if(this.coveringRadius >= this.explodingRadius) {
            return true;
        }
        else {
            return false;
        }
    }
    draw() {
        if(!this.explodeNow()) {
            this.handleMovement();
            sketch1.push();
            sketch1.fill('green');
            sketch1.circle(this.pos.x, this.pos.y, this.radius);
            sketch1.pop();
        }
        else {
            this.explode();
            if(!this.reachMaximumRadius()) {
                this.extendCoveringRadius();
            }
            else {
                this.handleExplodingTime();
            }
        }
    }
}