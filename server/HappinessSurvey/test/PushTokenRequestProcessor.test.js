var PushTokenRequestProcessor = require("../logical/PushTokenRequestProcessor");
var uuid = require('uuid/v4');

class FakeResponse {
    json(msg) {
        this._json = msg;
    }

    getJson() {
        return this._json;
    }
};


test("Access without required http request parameters should fail", async () => {
    var req = {
        query: {
            "session": "22333"
        }
    };
    var res = new FakeResponse();
    var next = function () {};
    return PushTokenRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson()).toEqual({
            "result": "Failed",
            "reason": "One of required paramters (session, pushtoken, platform) is missing."
        });
    });
});

test("Access with invalid session token should fail", async () => {
    var req = {
        query: {
            "session": "22333",
            "pushtoken": "udsidkxkkdisdkdsdkskdsdk",
            "platform": "ios"
        }
    };
    var res = new FakeResponse();
    var next = function () {};
    return PushTokenRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson()).toEqual({
            "result": "Failed",
            "reason": "Invalid session."
        });
    });
});

test("Normal access should succeed", async () => {
    var req = {
        query: {
            "session": "a82b2-e324fa02-ac3b42d1",
            "pushtoken": uuid(),
            "platform": "ios"
        }
    };
    var res = new FakeResponse();
    var next = function () {};
    return PushTokenRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson()).toEqual({
            "result": "OK"
        });
    });
});
