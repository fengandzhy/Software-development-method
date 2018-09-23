var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');
var Time = require("../utils/Time");

class NotificationCron {

    _connectToDatabase() {
        return dataBaseConnectionManager.getConnection().then( conn => {
            this._databaseConnection = conn;
        }).catch( err => {
            this.responseWithFailure(res, "Failed to establish database connection: " + err);
        });
    }

    _queryRegisteredUsers() {
        var sql = "SELECT user_id FROM Users WHERE user_role='user' AND registered_for_survey='1'";
        return this._databaseConnection.query(sql).then((result) => {
            this._userids = result.map((r) => {return r.user_id;});
        }).catch( err => {
            this._userids = [];
        });
    }

    _queryNotificationTriggerTimes() {
        var sql = "SELECT seconds_to_trigger FROM NotificationTriggerTimes";

        return this._databaseConnection.query(sql).then((result) => {
            this._triggerSeconds = result.map((r) => {return r.seconds_to_trigger;});
        }).catch( err => {
            this._triggerSeconds = [];
        });
    }

    _queryUserWorkingSpan(user_id) {
        var sql = `SELECT * FROM UserWorkingSpans WHERE user_id='${user_id}'`;
        return this._databaseConnection.query(sql).then((result) => {
            this._workSpans[user_id] = result[0];
        });
    }

    _startCronJobsForUser(user_id) {
        console.log(`Starting cron jobs for user ${user_id} ...`);

        var startTime = this._workSpans[user_id].start_time;
        var endTime = this._workSpans[user_id].end_time;

        
        endTime = new Time(endTime);

        this._triggerSeconds.forEach( triggerSec => {
            var notificationTime = new Time(startTime);
            notificationTime.addSeconds(triggerSec);
            console.log(`Should trigger notification at ${notificationTime}.`);
        });
    }

    start() {
        this._workSpans = {};
        this._userids = [];
        
        return this._connectToDatabase().then(() => {
            var p1 = this._queryRegisteredUsers();
            var p2 = this._queryNotificationTriggerTimes();
            return Promise.all([p1, p2]);
        }).then (() => {
            var promises = [];
            this._userids.forEach(user_id => {
                var promise = this._queryUserWorkingSpan(user_id).then(() => {
                    return this._startCronJobsForUser(user_id);
                });

                promises.push(promise);
            });
            return Promise.all(promises);
        }).then(
            () => { return dataBaseConnectionManager.destroyConnection(this._databaseConnection); }
        );
    }
}

var instance = new NotificationCron();
module.exports = instance;