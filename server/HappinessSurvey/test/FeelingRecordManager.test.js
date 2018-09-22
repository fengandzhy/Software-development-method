
var feelingRecordManager = require("../logical/FeelingRecordManager");
var DateUtil = require("../utils/DateUtil");
var now = new Date(Date.now());

var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');

var r1 = {
    my_feeling: 4, 
    team_feeling: 2,
    timeStamp: DateUtil.convertToSqlDate(now), 
    teamId: 1
};

var r2 = {
    my_feeling: 4, 
    team_feeling: 3,
    timeStamp: DateUtil.convertToSqlDate(now), 
    teamId: 1
};

var databaseConnection;

beforeAll(async () => {
    return dataBaseConnectionManager.getConnection().then(conn => {
        feelingRecordManager.setConnection(conn);
        databaseConnection = conn;
    });
});

afterAll(async() => {
    return dataBaseConnectionManager.destroyConnection(databaseConnection);
});

test("insert first", async () => {
    expect(1).toEqual(1);
    return feelingRecordManager.addRecord(r1).then(result => {
        expect(result.insertId).toBeGreaterThan(0);
    });
});

test("insert second", async () => {
    expect(1).toEqual(1);
    return feelingRecordManager.addRecord(r2).then( result => {
        expect(result.insertId).toBeGreaterThan(0);
    });
});

