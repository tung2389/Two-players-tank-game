
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

    drawItemName(posX, posY, name) {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text(name +': ' + this.amount.toString() + ' / ' + this.amountPerTime.toString(), posX - 40, posY - 40);
        sketch2.pop();
    }

    drawReloadingCircle(posX, posY) {
        sketch2.push();
        sketch2.fill('gray');
        sketch2.arc(posX, posY, 60, 60, 3/2 * sketch2.PI, this.angle);
        sketch2.textSize(10);
        sketch2.fill('red');
        sketch2.text('Reloading', posX - 60 / 2, posY);
        sketch2.pop();
    }

    drawFullCircle(posX, posY) {
        sketch2.push();
        sketch2.circle(posX, posY, 60)
        sketch2.pop();
    }

    drawReloading(posX, posY, name) {
        this.drawItemName(posX, posY, name);
        if(this.needReloading) {
            if(this.timePassed === 0) {
                this.doneReloading();
            }
            else {
                this.drawReloadingCircle(posX, posY);
                this.reload();
            }
        }
        else {
            this.drawFullCircle(posX, posY);
        }
    }

    drawHealth() {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text('Health', 20, 400);
        sketch2.fill('white');
        sketch2.rect(20, 420, 60, 10);
        sketch2.fill('green');
        sketch2.rect(20, 420, player.health * 60 / 6, 10);
        sketch2.pop();
    }
    
    drawPlayersInfo() {
        sketch2.push();
        sketch2.textSize(10);
        sketch2.fill('green');
        sketch2.text('Your name: ' + playerName, 6, 460);
        sketch2.text("Player2's name: " + playersData.opponentName, 6, 480);
        sketch2.text()
        sketch2.pop();
    }
}
