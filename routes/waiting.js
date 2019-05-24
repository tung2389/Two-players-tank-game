const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.sendFile(__dirname + '/client/public/pages/waitingPage.html');
});

module.exports = router;