class BaseDatabaseObjectManager {
    establishConnection() {
        return this.getConnection().then((conn) => {
            this.conn = conn;
        });
    }

    getConnection() {
        if (this.connection) return this.connection;
        this.databaseConnectionMgr = require("../utils/DataBaseConnectionManager");
        this.connection = this.databaseConnectionMgr.getConnection();
        return this.connection;
    }


}

module.exports = BaseDatabaseObjectManager;