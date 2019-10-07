const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';

class Grenade extends Bomb{
    constructor(radius, speed, flyingDistance, explodingRadius, explodingDamage, numberOfMiniBomb, explodingTime, id) {
        super(radius, speed, flyingDistance, explodingRadius, explodingTime, id);
        this.explodingDamage = explodingDamage;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.tankDamaged = [];
        grenadeSound.play();
    }

    explode() {
        if(this.playedSound === false) {
            explosionSound.play();
            this.playedSound = true;
        }
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