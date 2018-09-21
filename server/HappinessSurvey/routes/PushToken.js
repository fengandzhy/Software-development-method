var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    var DateUtil = require("../utils/DateUtil");
    var util = new DateUtil();
    var now = new Date(Date.now());

    var sessToken = req.query.session;
    var pushToken = req.query.pushtoken;
    var platform = req.query.platform;
    var PushTokenManager = require("../logical/PushTokenManager");
    var pushTokenManager = new PushTokenManager();
    var LoginSessionManager = require("../logical/LoginSessionManager");
    var loginSessionManager = new LoginSessionManager();
    var user_id;

    if (typeof sessToken === 'undefined' || typeof pushToken  === 'undefined' || typeof platform === 'undefined' ) {
        res.json({
            "result": "Failed",
            "reason": "One of required paramters (session, pushtoken, platform) is missing."
        });
        return;
    }

    pushTokenManager.establishConnection().then(
        () => {
            loginSessionManager.establishConnection().then(() => {
                loginSessionManager.getUserInfo(sessToken).then(result => {
                    user_id = result[0].user_id;
                    if (typeof user_id === 'undefined') {
                        res.json({
                            "result": "Failed",
                            "reason": "Invalid session."
                        });
                        return;
                    }

                    pushTokenManager.addPushToken(user_id, pushToken, platform).then((result) => {
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
                            "reason": "Database insertion failed." + err
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
