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
        push();
        fill('yellow');
        circle(this.pos.x, this.pos.y, this.coveringRadius * 2);
        pop();
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
            push();
            fill('green');
            circle(this.pos.x, this.pos.y, this.radius);
            pop();
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