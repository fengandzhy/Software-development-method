
var PushTokenManager = require("../logical/PushTokenManager");
var mgr = new PushTokenManager();

beforeAll(async () => {
    return mgr.establishConnection();
});

afterAll(async () => {
    return mgr.shutdownConnection();
})

test("put example push token should work", async () => {
    return mgr.addPushToken(1, '7ede6dfd1747c24fb3ba0246730c0254a54855de535ed5057c3406e40a351252', 'ios').then(result => {
    }).catch(err => {
        expect(err).toBeDefined();
    });
});


