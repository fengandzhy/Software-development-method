var notificationManager = require("../logical/NotificationManager");
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');
var databaseConnection;

beforeAll(async () => {
    await notificationManager.initIOSSender();
    return dataBaseConnectionManager.getConnection().then(conn => {
        notificationManager.setConnection(conn);
        databaseConnection = conn;
    });
});

afterAll(async() => {
    return dataBaseConnectionManager.destroyConnection(databaseConnection);
});

test("", async () => {

    expect(1).toEqual(1);
    
    return notificationManager.sendNotificationToIOSDevices(1, "You have a new message").then(result => {
        expect(Array.isArray(result[0].failed)).toBeTruthy();
        expect(Array.isArray(result[0].sent)).toBeTruthy();
    });

});

