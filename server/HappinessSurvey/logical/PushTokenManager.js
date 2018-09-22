
var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");

class PushTokenManager extends BaseDatabaseObjectManager {
    addPushToken(user_id, pushToken, platform) {
        var sql = `INSERT INTO PushTokens (user_id, token, platform) VALUES ('${user_id}', '${pushToken}', '${platform}')`;

        return this.conn.query(sql);
    }

    findPushTokens(user_id, platform) {
        var sql =  `SELECT token FROM PushTokens WHERE user_id='${user_id} AND platform='${platform}'`;

        return this.conn.query(sql);
    }
}

module.exports = PushTokenManager;
