
var FeelingRecordManager = require("../logical/FeelingRecordManager");
var DateUtil = require("../utils/DateUtil");

var mgr = new FeelingRecordManager();
var util = new DateUtil();
var now = new Date(Date.now());

var r1 = {
    feeling: 1, 
    timeStamp: util.convertToSqlDate(now), 
    teamId: 1, 
    isMyOwnFeeling: 1
}

var r2 = {
    feeling: 4, 
    timeStamp: util.convertToSqlDate(now), 
    teamId: 1, 
    isMyOwnFeeling: 0
}

beforeAll(async () => {
    await mgr.establishConnection();
});

test("insert first", async () => {
    expect(1).toEqual(1);
    return mgr.addRecord(r1);
});

test("insert second", async () => {
    expect(1).toEqual(1);
    return mgr.addRecord(r2);
});

