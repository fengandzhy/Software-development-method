
var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");

class PushTokenManager extends BaseDatabaseObjectManager {
    addPushToken(user_id, pushToken, platform) {
        var sql = `INSERT INTO PushTokens (user_id, token, platform) VALUES ('${user_id}', '${pushToken}', '${platform}')`;

        return this.conn.query(sql);
    }
}

module.exports = PushTokenManager;
