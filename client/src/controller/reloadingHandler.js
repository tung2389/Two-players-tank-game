// const GRENADE_PER_TIME = 1;
// const RELOADING_TIME;
// let NEED_RELOADING = false;

class ReloadingHandler {
    constructor(amountPerTime, reloadingTime) {
        this.amountPerTime = amountPerTime;
        this.reloadingTime = reloadingTime * FPS;
        this.amount = amountPerTime;
        this.needReloading = false;
        this.timePassed = reloadingTime * FPS;
        this.angle = 3/2 * sketch2.PI;
    }
    decreaseAmount() {
        if(this.amount > 0) {
            this.amount -= 1;
            if(this.amount === 0){
                this.needReloading = true;
            }
        }
    }
    reload() {
        this.timePassed -= 1;
        this.angle += 2 * sketch2.PI / this.reloadingTime;
    }
    doneReloading() {
        this.amount = this.amountPerTime;
        this.needReloading = false;
        this.timePassed = this.reloadingTime;
        this.angle = 3/2 * sketch2.PI;
    }
    drawReloading(posX, posY, name) {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text(name +': ' + this.amount.toString() + ' / ' + this.amountPerTime.toString(), posX - 40, posY - 40);
        sketch2.pop();
        if(this.needReloading) {
            if(this.timePassed === 0) {
                this.doneReloading();
            }
            else {
                sketch2.push();
                sketch2.fill('gray');
                sketch2.arc(posX, posY, 60, 60, 3/2 * sketch2.PI, this.angle);
                sketch2.textSize(10);
                sketch2.fill('red');
                sketch2.text('Reloading', posX - 60 / 2, posY);
                sketch2.pop();
                this.reload();
            }
        }
        else {
            sketch2.push();
            sketch2.circle(posX, posY, 60)
            sketch2.pop();
        }
    }
}