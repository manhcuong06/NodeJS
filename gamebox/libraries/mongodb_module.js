var MongoClient = require('mongodb').MongoClient;

var DbConnection = () => {
    var db = null;
    var instance = 0;

    DbConnect = async () => {
        try {
            let url = 'mongodb://localhost:27017/gamebox';
            let _db = await MongoClient.connect(url);
            return _db
        } catch (e) {
            return e;
        }
    }

    Get = async () => {
        try {
            instance++;
            if (db != null) {
                return db;
            } else {
                console.log('Create new connection.');
                db = await DbConnect();
                return db;
            }
        } catch (e) {
            return e;
        }
    }
    return {
        Get: Get
    }
}
module.exports = DbConnection();
