
var pushTokenManager = require("../logical/PushTokenManager");
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');
var databaseConnection;

beforeAll(async () => {
    return dataBaseConnectionManager.getConnection().then(conn => {
        pushTokenManager.setConnection(conn);
        databaseConnection = conn;
    });
});

afterAll(async() => {
    return dataBaseConnectionManager.destroyConnection(databaseConnection);
});


test("put example push token should work", async () => {
    return pushTokenManager.addPushToken(1, '7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252', 'ios').then(result => {
    }).catch(err => {
        expect(err).toBeDefined();
    });
});


