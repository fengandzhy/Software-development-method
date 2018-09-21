var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var DateUtil = require("../utils/DateUtil");
    var util = new DateUtil();
    var now = new Date(Date.now());

    var sessToken = req.query.session;
    var myFeeling = req.query.my_feeling;
    var teamFeeling = req.query.team_feeling;
    var FeelingRecordManager = require("../logical/FeelingRecordManager");
    var feelingRecordManager = new FeelingRecordManager();
    var LoginSessionManager = require("../logical/LoginSessionManager");
    var loginSessionManager = new LoginSessionManager();
    var teamId = 0;
    var record = {
        my_feeling: myFeeling, 
        team_feeling: teamFeeling,
        timeStamp: util.convertToSqlDate(now), 
        teamId: teamId
    };
    
    feelingRecordManager.establishConnection().then(
        () => {
            loginSessionManager.establishConnection().then(() => {
                loginSessionManager.getUserInfo(sessToken).then(result => {
                    teamId = result[0].team_id;
                    record.teamId = teamId;
                    feelingRecordManager.addRecord(record).then((result) => {
                        insertId = result.insertId;
                        if (insertId > 0) {
                            res.json({
                                "result": "OK",
                            });
                        } else {
                            res.json({
                                "result": "Failed",
                                "reason": "Database insertion failed."
                            });
                        }
                    })
                });
            }) 
        }
    );
});

module.exports = router;
