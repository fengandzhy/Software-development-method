
var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");

class LoginSessionManager extends BaseDatabaseObjectManager {
    getUserInfo(sessionToken) {
        var sql = `select s.user_id, u.team_id from LoginSessions s join Users u on s.user_id=u.user_id where s.token='${sessionToken}'`;

        return this.conn.query(sql);
    }    
}

module.exports = LoginSessionManager;