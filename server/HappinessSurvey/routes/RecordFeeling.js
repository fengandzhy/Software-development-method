var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    var sessToken = req.query.session;
    var myFeeling = req.query.my_feeling;
    var teamFeeling = req.query.team_feeling;
    var FeelingRecordManager = require("../logical/FeelingRecordManager");
    var feelingRecordManager = new FeelingRecordManager();

    var record = {
        my_feeling: 4, 
        team_feeling: 2,
        timeStamp: util.convertToSqlDate(now), 
        teamId: 1
    };

    await feelingRecordManager.establishConnection();

    feelingRecordManager.addRecord(record);

    res.send('respond with a resource');
});

module.exports = router;
