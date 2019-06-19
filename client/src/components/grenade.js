const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';
const FPS = 60;

class Grenade extends Bomb{
    constructor(tank, radius, speed, flyingDistance, explodingRadius, explodingDamage, numberOfMiniBomb, explodingTime) {
        super(tank, radius, speed, flyingDistance, explodingRadius, explodingTime);
        this.explodingDamage = explodingDamage;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.tankDamaged = [];
    }

    explode() {
        sketch1.push();
        sketch1.fill('red');
        sketch1.circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        sketch1.pop();
    }

    draw() {
        if(!this.explodeNow()) {
            this.handleMovement();
            sketch1.push();
            sketch1.fill('black');
            sketch1.circle(this.pos.x, this.pos.y, this.radius);
            sketch1.pop();
        }
        else {
            this.explode();
            this.handleExplodingTime();
        }
    }
}