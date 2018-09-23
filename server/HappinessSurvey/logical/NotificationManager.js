var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");
var BlueBird = require('bluebird');
var PushTokenManager = require('./PushTokenManager');
var apn = require('apn');

class NotificationManager extends BaseDatabaseObjectManager {
    initIOSSender() {
        var options = {
            token: {
                key: "bin/AuthKey_UYRZNQVAAK.p8",
                keyId: "UYRZNQVAAK",
                teamId: "P55D434QXP"
            },
            production: false
        };
  
        this.apnProvider = new apn.Provider(options);
    }

    queryDeviceTokens(user_id, platform) {
        var sql = `SELECT token FROM PushTokens WHERE user_id='${user_id}' and platform='${platform}'`;
        return this.databaseConnection.query(sql).then( (result) => {
            if ( Array.isArray(result) ) {
                this._tokensForUser = result.map( (r) => {return r.token} );
            } else {
                throw "Result not an array.";
            }
        }).catch( err => {
            this._tokensForUser = [];
        });
    }

    sendNotificationToIOSDevices(user_id, message) {
        
        return this.queryDeviceTokens(user_id, 'ios').then(() => {

            var promises = [];
            this._tokensForUser.forEach( deviceToken => {
                if (deviceToken.length == 64) { // only deal with tokens that are of 64 characters.

                    var note = new apn.Notification();
                    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                    note.badge = 3;
                    note.sound = "ping.aiff";
                    note.alert = "\uD83D\uDCE7 \u2709 " + message;
                    note.payload = {'messageFrom': 'Patricia'};
                    note.topic = "app.test.HappinessMonitor";
                    var promise = this.apnProvider.send(note, deviceToken).catch(e => {
                        console.log("failed: " + e);
                    });

                    promises.push(promise);
                }

            });
            return Promise.all(promises);
        });
    }
}

var instance = new NotificationManager();

module.exports = instance;
