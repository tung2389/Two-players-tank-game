const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';

class Grenade {
    constructor(radius, speed, flyingDistance, explodingRadius, explodingDamage, numberOfMiniBomb) {
        this.radius = radius;
        this.speed = speed;
        this.flyingDistance = flyingDistance;
        this.explodingDamage = explodingRadius;
        this.explodingDamage = explodingDamage;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.direction = p5.Vector.fromAngle(tank.angle + PI);
        this.originalPos = returnPosByDirection(tank, this.direction); 
        this.pos = returnPosByDirection(tank, this.direction); 
    }
    handleMovement() {
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    }
    explode() {
        push();
        fill(255, 51, 0);
        circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        pop();
    }
    tankDamagedByExplosion(tank) {
        if(dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y) 
           - this.explodingRadius 
           - tank.radius
           - STROKE_WEIGHT < 0
        ) {
            tank.lostHealth(explodingDamage);
        }
    }
}