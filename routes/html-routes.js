const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../public/mock/index.html'));
})

router.get('/exercise', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/mock/exercise.html'));
});

router.get('/stats', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/mock/stats.html'));
});

module.exports = router