var DateUtil = require("../utils/DateUtil");
var feelingRecordManager = require("../logical/FeelingRecordManager");
var BaseAPIRequestProcessor = require('../logical/BaseAPIRequestProcessor');

class RecordFeelingRequestProcessor extends BaseAPIRequestProcessor {

    processSubTasks(req, res, next) {
        var myFeeling = req.query.my_feeling;
        var teamFeeling = req.query.team_feeling;
        var teamId = this.getLoggedInUserInfo().team_id;
        var now = new Date(Date.now());
        var record = {
            my_feeling: myFeeling,
            team_feeling: teamFeeling,
            teamId: teamId,
            timeStamp: DateUtil.convertToSqlDate(now)
        };

        feelingRecordManager.setConnection(this.getEstablishedDatabaseConnection());
        feelingRecordManager.addRecord(record).then((result) => {
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
        
        var myFeeling = req.query.my_feeling;
        var teamFeeling = req.query.team_feeling;

        if (typeof myFeeling === 'undefined' || typeof teamFeeling === 'undefined')
            return false;
        
        return true;
    }

    getRequiredRequestParameters() {
        return super.getRequiredRequestParameters() + ", my_feeling, team_feeling";
    }
}

var instance = new RecordFeelingRequestProcessor();
module.exports = instance;