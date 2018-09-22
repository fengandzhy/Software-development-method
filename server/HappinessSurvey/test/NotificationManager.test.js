var NotificationManager = require("../logical/NotificationManager");
var notificationManager = new NotificationManager();

beforeAll(async () => {
    await notificationManager.initIOSSender();
});

test("", async () => {

    expect(1).toEqual(1);

    return notificationManager.sendNotificationToIOSDevices(1, "You have a new message").then(result => {
        expect(result).toEqual({"failed": [], "sent": [{"device": "7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252"}]});
    });

});

