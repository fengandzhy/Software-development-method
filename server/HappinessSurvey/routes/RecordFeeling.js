var express = require('express');
var router = express.Router();
var RecordFeelingRequestProcessor = require("../logical/RecordFeelingRequestProcessor");

router.post('/', function(req, res, next) {
    RecordFeelingRequestProcessor.processRequest(req, res, next);
});

module.exports = router;
