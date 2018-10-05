var DateUtil = require("../utils/DateUtil");

test("Matches UTC date format", () => {

    var d = new Date("2015-03-10T13:12:00Z");

    expect(DateUtil.convertToSqlDate(d)).toEqual("2015-03-10 13:12:00");

});

test("Matches ISO date format", () => {

    var d = new Date("2015-03-10");

    expect(DateUtil.convertToSqlDate(d)).toEqual("2015-03-10 00:00:00");

});
