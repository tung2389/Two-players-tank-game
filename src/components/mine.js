class Mine extends Bomb {
    constructor(radius, speed, flyingDistance, explodingRadius, explodingDamage, explodingTime, id) {
        super(radius, speed, flyingDistance, explodingRadius, explodingTime, id);
        this.explodingDamage = explodingDamage;
        this.tankDamaged = [];
        // grenadeSound.play();
    }
    explodeNow() {
        if(this.collideWithTanks()) {
            return true
        }
        else {
            return false
        }
    }
    explode() {
        if(this.playedSound === false) {
            // explosionSound.play();
            this.playedSound = true;
        }
        sketch1.push();
        sketch1.fill('red');
        sketch1.circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        sketch1.pop();
    }
    draw() {
        if(!this.cannotFlyAnymore()) {
            this.handleMovement()
        }
        if(this.explodeNow()) {{
            this.exploded = true
        }}
        if(!this.exploded) {
            sketch1.push()
            sketch1.fill('black');
            sketch1.circle(this.pos.x, this.pos.y, this.radius * 2);
            sketch1.fill('red')
            sketch1.circle(this.pos.x, this.pos.y, 0.4 * this.radius * 2);
            sketch1.pop()
        }
        else {
            this.explode()
            this.handleExplodingTime()
        }
    }
}