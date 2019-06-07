const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';

class Grenade {
    constructor(radius, speed, flyingDistance, explodingRadius, numberOfMiniBomb, explodingDamage, radiusOfMiniBomb, miniBombDamage) {
        this.radius = radius;
        this.speed = speed;
        this.flyingDistance = flyingDistance;
        this.explodingDamage = explodingRadius;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.explodingDamage = explodingDamage;
        this.miniBomb = {
            radius: radiusOfMiniBomb,
            damage: miniBombDamage
        }
    }
    
}