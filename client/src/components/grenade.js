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
        push();
        fill('red');
        circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        pop();
    }

    draw() {
        if(!this.explodeNow()) {
            this.handleMovement();
            push();
            fill('black');
            circle(this.pos.x, this.pos.y, this.radius);
            pop();
        }
        else {
            this.explode();
            this.handleExplodingTime();
        }
    }
}