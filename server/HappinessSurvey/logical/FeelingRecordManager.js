
class FeelingRecordManager {
    
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

    addRecord(record) {
        var sql = `INSERT INTO FeelingRecords (feeling, time_stamp, team_id, is_my_own_feeling)
            VALUES('${record.feeling}', '${record.timeStamp}', '${record.teamId}', '${record.isMyOwnFeeling}')`;
        console.log(sql);
        return this.conn.query(sql).then( result => {
            console.log(result);
        });
    }
    
}

module.exports = FeelingRecordManager;
