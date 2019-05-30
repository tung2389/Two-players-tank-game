var socket = io();
var socketGlobalHandler;
var playerData;

async function changeDomContentTo(url) {
    let htmlContent = await getHTMLContent(url);
    rewriteHTMLFile(htmlContent);
}

async function getHTMLContent(url) {
    let responseObject = await fetch(url, {
        headers: {
            'Content-Type':'text/html'
        }
    });
    let htmlContent = await responseObject.text();
    return htmlContent;
}

function rewriteHTMLFile(htmlContent) {
    document.open();
    document.write(htmlContent);
    document.close();
}

function isPlayerNameValid(playerName) {
    if(playerName !== "")
        return true;
    else
        return false;
}

function getUserName() {
    return document.getElementById('name').value;
}

class SocetGlobalHandler {
    constructor() {

    }

    sendAcceleratingAction(direction) {
        socket.emit('Control', {
            type: 'Accelerate',
            direction: direction
        });
    }

    sendDeceleratingAction() {
        socket.emit('Control', {
            type: 'Decelerate',
        });
    }
    
    sendStoppingDeceleratingAction() {
        socket.emit('Control', {
            type: 'Stop decelerating',
        });
    }

    sendTurningAction(direction) {
        socket.emit('Control', {
            type: 'Turn',
            direction: direction
        });
    }

    sendShootingAction() {
        socket.emit('Control', {
            type: 'Shoot'
        });
    }
    
    // sendLosingHealthAction() {
    //     socket.emit('Control', {
    //         type: 'Lost health'
    //     });
    // }

    setupListeningAndHandling() {
        socket.on('Please wait', () => changeDomContentTo('/public/pages/waitingPage.html'));
        socket.on('Starting battle', (data) => {
            changeDomContentTo('/public/index.html');
            playerData = data;
        });
    }

    findPlayer() {
        let playerName = getUserName();
        if(isPlayerNameValid(playerName)) {
            socket.emit('Find player',{name:playerName});
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
        if(action.type === 'Turn') {
            opponent.turn(action.direction);
        }
        if(action.type === 'Shoot') {
            opponentBulletHandler.createBullet();
        }
        if(action.type === 'Accelerate') {
            opponent.accelerate(action.direction);
        }
        if(action.type === 'Decelerate') {
            playerGlobalHandler.opponentTankDecelerate();
        }
        if(action.type === 'Stop decelerating') {
            playerGlobalHandler.opponentTankStopDecelerating();
        }
    }
}

socketGlobalHandler = new SocetGlobalHandler();