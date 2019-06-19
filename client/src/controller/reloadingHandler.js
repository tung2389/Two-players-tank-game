// const GRENADE_PER_TIME = 1;
// const RELOADING_TIME;
// let NEED_RELOADING = false;

class ReloadingHandler {
    constructor(amountPerTime, reloadingTime) {
        this.amountPerTime = amountPerTime;
        this.reloadingTime = reloadingTime;
        this.amount = amountPerTime;
        this.needReloading = false;
    }
    decreaseAmount() {
        if(this.amount > 0) {
            this.amount -= 1;
            if(this.amount === 0){
                this.needReloading = true;
            }
        }
    }
    doneReloading() {
        this.amount = this.amountPerTime;
    }
    drawReloading(posX, posY) {
        if(this.needReloading) {
            sketch2.push();
            sketch2.circle(posX, posY, 40);
            sketch2.pop();
        }
        else {
            sketch2.push();
            sketch2.circle(posX, posY, 60)
            sketch2.pop();
        }
    }
}