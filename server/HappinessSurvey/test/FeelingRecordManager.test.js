
var FeelingRecordManager = require("../logical/FeelingRecordManager");
var DateUtil = require("../utils/DateUtil");

var mgr = new FeelingRecordManager();
var util = new DateUtil();
var now = new Date(Date.now());

var r1 = {
    my_feeling: 4, 
    team_feeling: 2,
    timeStamp: util.convertToSqlDate(now), 
    teamId: 1
}

var r2 = {
    my_feeling: 4, 
    team_feeling: 3,
    timeStamp: util.convertToSqlDate(now), 
    teamId: 1
}

beforeAll(async () => {
    return mgr.establishConnection();
});

afterAll(async () => {
    return mgr.shutdownConnection();
})

test("insert first", async () => {
    expect(1).toEqual(1);
    return mgr.addRecord(r1).then(result => {
        expect(result.insertId).toBeGreaterThan(0);
    });
});

test("insert second", async () => {
    expect(1).toEqual(1);
    return mgr.addRecord(r2).then( result => {
        expect(result.insertId).toBeGreaterThan(0);
    });
});

