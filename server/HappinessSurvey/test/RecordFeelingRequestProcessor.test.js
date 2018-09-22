var RecordFeelingRequestProcessor = require("../logical/RecordFeelingRequestProcessor");

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
    return RecordFeelingRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson().result).toEqual("Failed");
    });
});

test("Access with invalid session token should fail", async () => {
    var req = {
        query: {
            "session": "22333",
            "my_feeling": 2,
            "team_feeling": 3
        }
    };
    var res = new FakeResponse();
    var next = function () {};
    return RecordFeelingRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson().result).toEqual("Failed");
    });
});

test("Normal access should succeed", async () => {
    var req = {
        query: {
            "session": "a82b2-e324fa02-ac3b42d1",
            "my_feeling": 2,
            "team_feeling": 3
        }
    };
    var res = new FakeResponse();
    var next = function () {};
    return RecordFeelingRequestProcessor.processRequest(req, res, next).then (() => {
        expect(res.getJson()).toEqual({
            "result": "OK"
        });
    });
});
