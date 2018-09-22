var express = require('express');
var router = express.Router();
var DateUtil = require("../utils/DateUtil");
var feelingRecordManager = require("../logical/FeelingRecordManager");
var loginSessionManager = require("../logical/LoginSessionManager");
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');
var databaseConnection;

function responseWithSuccess(res) {
    res.json({
        "result": "OK",
    });
    dataBaseConnectionManager.destroyConnection(databaseConnection);
}

function responseWithFailure(res, reason) {
    res.json({
        "result": "Failed",
        "reason": reason
    });
    dataBaseConnectionManager.destroyConnection(databaseConnection);
}

router.post('/', function(req, res, next) {

    var now = new Date(Date.now());
    var sessToken = req.query.session;
    var myFeeling = req.query.my_feeling;
    var teamFeeling = req.query.team_feeling;
    var teamId = 0;
    var record = {
        my_feeling: myFeeling, 
        team_feeling: teamFeeling,
        timeStamp: DateUtil.convertToSqlDate(now),
        teamId: teamId
    };
    
    if (typeof sessToken === 'undefined' || typeof myFeeling  === 'undefined' || typeof teamFeeling === 'undefined') {
        responseWithFailure(res, "One of required paramters (session, my_feeling, team_feeling) is missing.");
        return;
    }

    dataBaseConnectionManager.getConnection().then(conn => {
        loginSessionManager.setConnection(conn);
        feelingRecordManager.setConnection(conn);
        databaseConnection = conn;

        loginSessionManager.getUserInfo(sessToken).then(result => {
            teamId = result[0].team_id;
            record.teamId = teamId;

            feelingRecordManager.addRecord(record).then((result) => {
                insertId = result.insertId;
                responseWithSuccess(res);
                return;
            }).catch( err => {
                responseWithFailure(res, "Database insertion failed:" + err);
                return;
            })
        }).catch( (err) => {
            responseWithFailure(res, "Invalid session: " + err);
            return;
        })
    }).catch( err => {
        responseWithFailure(res, "Failed to establish database connection: " + err);
        return;
    });

});

module.exports = router;
