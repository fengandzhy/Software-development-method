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
    
    if (typeof sessToken === 'undefined' || typeof myFeeling  === 'undefined' || typeof teamFeeling === 'undefined') {
        res.json({
            "result": "Failed",
            "reason": "One of required paramters (session, my_feeling, team_feeling) is missing."
        });
        return;
    }

    feelingRecordManager.establishConnection().then(
        () => {
            loginSessionManager.establishConnection().then(() => {
                loginSessionManager.getUserInfo(sessToken).then(result => {
                    teamId = result[0].team_id;
                    record.teamId = teamId;
                    if (typeof teamId === 'undefined') {
                        res.json({
                            "result": "Failed",
                            "reason": "Invalid session."
                        });
                        return;
                    }

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
                    }).catch( err => {
                        res.json({
                            "result": "Failed",
                            "reason": "Database insertion failed."
                        });
                        return;
                    })
                }).catch( (err) => {
                    res.json({
                        "result": "Failed",
                        "reason": "Invalid session."
                    });
                    return;
                })
            })
        }
    );
});

module.exports = router;
