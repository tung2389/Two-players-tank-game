var pageController;
var playerName;

class PageController {
    constructor() {

    }

    async changeDomContentTo(url) {
        let htmlContent = await this.getHTMLContent(url);
        this.rewriteHTMLFile(htmlContent);
    }
    
    async getHTMLContent(url) {
        let responseObject = await fetch(url, {
            headers: {
                'Content-Type':'text/html'
            }
        });
        let htmlContent = await responseObject.text();
        return htmlContent;
    }
    
    rewriteHTMLFile(htmlContent) {
        document.open();
        document.write(htmlContent);
        document.close();
    }
    
    isPlayerNameValid(playerName) {
        if(playerName !== "")
            return true;
        else
            return false;
    }
    
    getUserName() {
        playerName = document.getElementById('name').value
        return playerName;
    }

    modifyFindPlayerButton() {
        let button = document.getElementById("findPlayer")
        button.disabled = true
        button.innerHTML = "Please wait"
    }
}

pageController = new PageController();