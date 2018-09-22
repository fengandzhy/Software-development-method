
var BlueBird = require('bluebird');
var PushTokenManager = require('./PushTokenManager');
var apn = require('apn');

class NotificationManager {
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

    sendNotificationToIOSDevices(user_id, message) {

        let deviceToken = "7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252";
        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "\uD83D\uDCE7 \u2709 " + message;
        note.payload = {'messageFrom': 'Patricia'};
        note.topic = "app.test.HappinessMonitor";

        return this.apnProvider.send(note, deviceToken);

        test("", () => {

            expect(1).toEqual(1);
            // return apnProvider.send(note, deviceToken).then( (result) => {
            //     // see documentation for an explanation of result
            //     expect(result).toEqual({"failed": [], "sent": [{"device": "7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252"}]});
            // });
        })
    }
}

module.exports = NotificationManager;
