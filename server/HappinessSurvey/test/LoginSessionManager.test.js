
var LoginSessionManager = require("../logical/LoginSessionManager");
var mgr = new LoginSessionManager();

beforeAll(async () => {
    return mgr.establishConnection();
});

afterAll(async () => {
    return mgr.shutdownConnection();
})

test("example session token is OK", async () => {
    // this token is inserted into login session table in my_sql_scripts/create_tables.sql
    return mgr.getUserInfo('a82b2-e324fa02-ac3b42d1').then(result => {
        console.log(result);
        expect(result[0].user_id).toEqual(1);
        expect(result[0].team_id).toEqual(1);
    });
});


