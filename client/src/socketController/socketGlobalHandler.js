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

    sendMovingAction(pos) {
        socket.emit('Control', {
            type: 'Move',
            pos : {
                x: pos.x,
                y: pos.y
            }
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
        if(action.type === 'Move') {
            opponent.moveToPos(action.pos);
        }
        if(action.type === 'Turn') {
            opponent.turnTo(action.angle);
         }
        if(action.type === 'Shoot') {
            opponentBulletHandler.createBullet();
        }
    }
}

socketGlobalHandler = new SocetGlobalHandler();