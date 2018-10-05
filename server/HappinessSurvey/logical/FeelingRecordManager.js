var BaseDatabaseObjectManager = require("./BaseDatabaseObjectManager");

class FeelingRecordManager extends BaseDatabaseObjectManager {

    addRecord(record) {
        var sql = `INSERT INTO FeelingRecords (my_feeling, team_feeling, time_stamp, team_id)
            VALUES('${record.my_feeling}', '${record.team_feeling}', '${record.timeStamp}', '${record.teamId}')`;
        console.log(sql);
        return this.databaseConnection.query(sql);
    }
    
}

var instance = new FeelingRecordManager();

module.exports = instance;
