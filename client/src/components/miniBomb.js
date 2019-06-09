class MiniBomb {
    constructor(pos, radius, damage) {
        this.pos = pos;
        this.radius = radius;
        this.damage = damage;
    }
    tankDamageByMiniBomb(tank) {
        if(dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y)
           - this.radius
           - tank.radius
           - STROKE_WEIGHT < 0
        ) {
            tank.lostHealth(this.damage);
        }
    }
}