var socket = io();
var socketGlobalHandler;
var playersData;
var wallMap;

class SocetGlobalHandler {
    constructor() {

    }

    sendMovingAction(pos) {
        socket.emit('Control', {
            type: 'Move',
            pos: pos
        });
    }

    sendTurningAction(angle) {
        socket.emit('Control', {
            type: 'Turn',
            angle: angle
        });
    }

    sendShootingAction() {
        socket.emit('Control', {
            type: 'Shoot'
        });
    }

    sendThrowingGrenadeAction() {
        socket.emit('Control', {
            type: 'Throw grenade'
        });
    }

    sendThrowingSmokeAction() {
        socket.emit('Control', {
            type: 'Throw smoke'
        });
    }

    setupListeningAndHandling() {
        socket.on('Starting battle', (data) => {
            pageController.changeDomContentTo('/public/index.html');
            playersData = data.playersInfo;
            wallMap = data.map;
        });
    }

    findPlayer() {
        let playerName = pageController.getUserName();
        if(pageController.isPlayerNameValid(playerName)) {
            socket.emit('Find player',{name:playerName});
            pageController.changeDomContentTo('/public/pages/waitingPage.html');
        }
        else {
            alert('Username cannot be empty');
        }
    }

    listenForControllingAction() {
        socket.on('Control', (action) => {
            this.handleControllingActionReceived(action);
        })
    }

    handleControllingActionReceived(action) {
        if(action.type === 'Move') {
            opponent.moveToPos(action.pos);
        }
        if(action.type === 'Turn') {
            opponent.turnTo(action.angle);
         }
        if(action.type === 'Shoot') {
            bulletHandler.createBullet(opponent);
        }
        if(action.type === 'Throw grenade') {
            grenadeHandler.createGrenade(opponent);
        }
        if(action.type === 'Throw smoke') {
            smokeHandler.createSmoke(opponent);
        }
    }
}

socketGlobalHandler = new SocetGlobalHandler();