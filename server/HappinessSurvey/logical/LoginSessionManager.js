
var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");

class LoginSessionManager extends BaseDatabaseObjectManager {
    getUserInfo(sessionToken) {
        var sql = `select s.user_id, u.team_id from loginsessions s join users u on s.user_id=u.user_id where s.token='${sessionToken}'`;

        return this.conn.query(sql);
    }    
}