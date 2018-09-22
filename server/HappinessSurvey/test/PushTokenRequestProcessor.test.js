var PushTokenRequestProcessor = require("../logical/PushTokenRequestProcessor");

class FakeResponse {
    json(msg) {
        this._json = msg;
    }

    getJson() {
        return this._json;
    }
};


test("", async () => {
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

test("", async () => {
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
