class Smoke extends Bomb {
    constructor(tank, radius, speed, flyingDistance, explodingRadius, emittingSpeed, explodingTime, sketch) {
        super(tank, radius, speed, flyingDistance, explodingRadius, explodingTime, sketch);
        this.emittingSpeed = emittingSpeed;
        this.coveringRadius = 0;
    };
    extendCoveringRadius() {
        this.coveringRadius += this.emittingSpeed;
    }
    explode() {
        this.sketch.push();
        this.sketch.fill('yellow');
        this.sketch.circle(this.pos.x, this.pos.y, this.coveringRadius * 2);
        this.sketch.pop();
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
            this.sketch.push();
            this.sketch.fill('green');
            this.sketch.circle(this.pos.x, this.pos.y, this.radius);
            this.sketch.pop();
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