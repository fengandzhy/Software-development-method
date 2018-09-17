
var Config = require("./configuration").Config;
var MongoClient = require("mongodb").MongoClient;

class MongoDb {

    getDBO() {
        var dbo;
        // Create the db connection
        MongoClient.connect(Config.__MONGO_DB_URL__, function(err, db) {
            assert.equal(null, err);
            console.log(db);
            dbo=db.db(Config.__MONGO_DB_NAME__);
            console.log(dbo);
            }
        );

        return dbo;
    }

}

module.exports = { MongoDb };
