
class DateUtil {
    convertToSqlDate(date) {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }
}

var instance = new DateUtil();
module.exports = instance;