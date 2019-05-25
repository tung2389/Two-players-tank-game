const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../client/public/pages/waitingPage.html'));
});

module.exports = router;