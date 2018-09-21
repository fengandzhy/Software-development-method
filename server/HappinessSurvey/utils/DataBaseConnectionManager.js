
var Config = require("./Config");
var mysql = require('promise-mysql');

class DataBaseConnectionManager {
  
  getPool() {
    if (this.pool) return this.pool;
    this.pool = mysql.createPool({
      host     : Config.host,
      user     : Config.user,
      password : Config.password,
      database : Config.database,
      connectionLimit: 10
    });
    
    return this.pool;
  }

  getConnection() {
    return this.getPool().getConnection();
  }

  destroyConnection(conn) {
    conn.release();
  }

}

var dataBaseConnectionManager = new DataBaseConnectionManager();
module.exports = dataBaseConnectionManager;