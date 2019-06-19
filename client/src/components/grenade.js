const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';
const FPS = 60;

class Grenade extends Bomb{
    constructor(tank, radius, speed, flyingDistance, explodingRadius, explodingDamage, numberOfMiniBomb, explodingTime, sketch) {
        super(tank, radius, speed, flyingDistance, explodingRadius, explodingTime, sketch);
        this.explodingDamage = explodingDamage;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.tankDamaged = [];
    }

    explode() {
        this.sketch.push();
        this.sketch.fill('red');
        this.sketch.circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        this.sketch.pop();
    }

    draw() {
        if(!this.explodeNow()) {
            this.handleMovement();
            this.sketch.push();
            this.sketch.fill('black');
            this.sketch.circle(this.pos.x, this.pos.y, this.radius);
            this.sketch.pop();
        }
        else {
            this.explode();
            this.handleExplodingTime();
        }
    }
}