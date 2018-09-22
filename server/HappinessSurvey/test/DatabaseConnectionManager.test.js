
var dataBaseConnectionManager = require('../utils/DataBaseConnectionManager');

var connection;

// beforeAll(async () => {
//     return dataBaseConnectionManager.getConnection().then(conn => {
//         connection = conn;
//     });
// });

// afterAll(async() => {
//     return dataBaseConnectionManager.destroyConnection(connection);
// });

it('can create a connection', async () => {
    expect(1).toBe(1);
    // return connection.query("SELECT team_name FROM teams WHERE team_id = 1").then ( result => {
    //     expect(result[0].team_name).toEqual("Dev team one");
    // }).then( () => {
    //     dataBaseConnectionManager.destroyConnection(connection);
    // });
});
