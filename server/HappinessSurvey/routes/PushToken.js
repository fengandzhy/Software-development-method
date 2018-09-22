var express = require('express');
var router = express.Router();
var DateUtil = require("../utils/DateUtil");
var pushTokenManager = require("../logical/PushTokenManager");
var loginSessionManager = require("../logical/LoginSessionManager");
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');
var databaseConnection;

function responseWithSuccess(res) {
    res.json({
        "result": "OK",
    });
    dataBaseConnectionManager.destroyConnection(databaseConnection);
}

var responseWithFailure = function (res, reason) {
    res.json({
        "result": "Failed",
        "reason": reason
    });
    dataBaseConnectionManager.destroyConnection(databaseConnection);
}

router.post('/', function(req, res, next) {

    var now = new Date(Date.now());
    var sessToken = req.query.session;
    var pushToken = req.query.pushtoken;
    var platform = req.query.platform;

    if (typeof sessToken === 'undefined' || typeof pushToken  === 'undefined' || typeof platform === 'undefined' ) {
        responseWithFailure(res, "One of required paramters (session, pushtoken, platform) is missing.");
        return;
    }

    dataBaseConnectionManager.getConnection().then(conn => {
        loginSessionManager.setConnection(conn);
        pushTokenManager.setConnection(conn);
        databaseConnection = conn;

        loginSessionManager.getUserInfo(sessToken).then(result => {
            var user_id = result[0].user_id;
            pushTokenManager.addPushToken(user_id, pushToken, platform).then((result) => {
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
