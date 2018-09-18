var apn = require('apn');

var options = {
    token: {
      key: "bin/AuthKey_UYRZNQVAAK.p8",
      keyId: "UYRZNQVAAK",
      teamId: "P55D434QXP"
    },
    production: false
};
  
var apnProvider = new apn.Provider(options);

let deviceToken = "7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252";

var note = new apn.Notification();

note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
note.badge = 3;
note.sound = "ping.aiff";
note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
note.payload = {'messageFrom': 'John Appleseed'};
note.topic = "app.test.HappinessMonitor";

test("", () => {
    return apnProvider.send(note, deviceToken).then( (result) => {
        // see documentation for an explanation of result
        expect(result).toBe(0);
    });
})

