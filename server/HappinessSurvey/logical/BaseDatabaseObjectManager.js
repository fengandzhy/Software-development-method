class BaseDatabaseObjectManager {
    establishConnection() {
        return this._getConnection().then((conn) => {
            this.conn = conn;
        });
    }

    _getConnection() {
        if (this.connection) return this.connection;
        this.databaseConnectionMgr = require("../utils/DataBaseConnectionManager");
        this.connection = this.databaseConnectionMgr.getConnection();
        return this.connection;
    }

    shutdownConnection() {
        if (this.conn) {
            this.databaseConnectionMgr.destroyConnection(this.conn);
        }
    }
}

module.exports = BaseDatabaseObjectManager;