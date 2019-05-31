var pageController;

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
        return document.getElementById('name').value;
    }
}

pageController = new PageController();