class Smoke extends Bomb {
    constructor(radius, speed, flyingDistance, explodingRadius, emittingSpeed, explodingTime, id) {
        super(radius, speed, flyingDistance, explodingRadius, explodingTime, id);
        this.emittingSpeed = emittingSpeed;
        this.coveringRadius = 0;
        grenadeSound.play()
    };
    extendCoveringRadius() {
        this.coveringRadius += this.emittingSpeed;
    }
    explode() {
        if(this.playedSound === false) {
            smokeSound.play();
            this.playedSound = true;
        }
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