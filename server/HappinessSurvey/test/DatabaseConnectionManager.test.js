
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');

var connection;

beforeAll(async () => {
    await dataBaseConnectionManager.getConnection().then(conn => {
        connection = conn;
    });
});

afterAll(async() => {
    await dataBaseConnectionManager.destroyConnection(connection);
});

it('can create a connection', async () => {
    return connection.query("SELECT team_name FROM teams WHERE team_id = 1").then ( result => {
        expect(result[0].team_name).toEqual("Dev team one");
    });
});
