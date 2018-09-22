var express = require('express');
var router = express.Router();
var PushTokenRequestProcessor = require('../logical/PushTokenRequestProcessor');

router.post('/', function(req, res, next) {
    PushTokenRequestProcessor.processRequest(req, res, next);
});

module.exports = router;
