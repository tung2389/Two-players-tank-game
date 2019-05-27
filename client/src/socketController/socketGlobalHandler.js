var socket = io();
var socketGlobalHandler;
var playerData;

async function changeDomContentTo(url) {
    let htmlContent = await getHTMLContent(url);
    rewriteHTMLFile(htmlContent);
}

function rewriteHTMLFile(htmlContent) {
    document.open();
    document.write(htmlContent);
    document.close();
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

    move() {

    }

    changeDirection() {

    }

    shoot() {
        
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
            alert("Username cannot be empty");
        }
    }
}

socketGlobalHandler = new SocetGlobalHandler();