var pushTokenManager = require("../logical/PushTokenManager");
var BaseAPIRequestProcessor = require('../logical/BaseAPIRequestProcessor');

class PushTokenRequestProcessor extends BaseAPIRequestProcessor {

    processSubTasks(req, res, next) {
        var pushToken = req.query.pushtoken;
        var platform = req.query.platform;
        var user_id = this.getLoggedInUserInfo().user_id;

        pushTokenManager.setConnection(this.getEstablishedDatabaseConnection());
        pushTokenManager.addPushToken(user_id, pushToken, platform).then((result) => {
            this.responseWithSuccess(res);
            return;
        }).catch( err => {
            this.responseWithFailure(res, "Database insertion failed:" + err);
            return;
        });
    }

    checkForRequiredRequestParameters(req) {
        
        if (!super.checkForRequiredRequestParameters(req))
            return false;
        
        var pushToken = req.query.pushtoken;
        var platform = req.query.platform;

        if (typeof pushToken === 'undefined' || typeof platform === 'undefined')
            return false;
        
        return true;
    }

    getRequiredRequestParameters() {
        return super.getRequiredRequestParameters() + ", pushtoken, platform";
    }

}

var instance = new PushTokenRequestProcessor();

module.exports = instance;
