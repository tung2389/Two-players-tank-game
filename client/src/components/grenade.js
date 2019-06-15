const colorOfGrenade = 'black';
const colorOfMiniBomb = 'black';
const FPS = 60;

class Grenade {
    constructor(tank, radius, speed, flyingDistance, explodingRadius, explodingDamage, numberOfMiniBomb) {
        this.radius = radius;
        this.speed = speed;
        this.flyingDistance = flyingDistance;
        this.explodingRadius = explodingRadius;
        this.explodingDamage = explodingDamage;
        this.numberOfMiniBomb = numberOfMiniBomb;
        this.direction = p5.Vector.fromAngle(tank.angle + PI);
        this.originalPos = returnPosByDirection(tank, this.direction); 
        this.pos = returnPosByDirection(tank, this.direction); 
        this.explodingTime = 1 * FPS;
        this.doneExploding = false;
    }

    handleMovement() {
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    }
    collideWithTank(tank) {
        if(dist(this.pos.x, this.pos.y, tank.pos.x, tank.pos.y)
           - this.radius
           - tank.radius
           - STROKE_WEIGHT 
           < 0
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    collideWithAxis() {
        if(
            this.pos.x - this.radius < 0 ||
            this.pos.y - this.radius < 0 ||
            this.pos.x + this.radius > canvas.width ||
            this.pos.y + this.radius > canvas.heigth  
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    cannotFlyAnymore() {
        if(dist(this.pos.x, this.pos.y, this.originalPos.x, this.originalPos.y) >= this.flyingDistance) {
            return true;
        }
        else {
            return false;
        }
    }
    explodeNow() {
        if(this.collideWithTank(opponent) ||
           this.collideWithAxis() ||
           this.cannotFlyAnymore()
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    explode() {
        console.log(1);
        push();
        fill('red');
        circle(this.pos.x, this.pos.y, this.explodingRadius * 2);
        pop();
    }

    handleExplodingTime() {
        if(this.explodingTime > 0) {
            this.explodingTime -= 1;
        }
        else {
            this.doneExploding = true;
        }
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
            if(!this.doneExploding) {
                this.explode();
            }
            this.handleExplodingTime();
        }
    }
}