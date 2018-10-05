class BaseDatabaseObjectManager {
    setConnection(conn) {
        this.databaseConnection = conn;
    }
}

module.exports = BaseDatabaseObjectManager;