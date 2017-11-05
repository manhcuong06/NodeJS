var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient();

var db;

MongoClient.connect('mongodb://localhost:27017/gamebox', (err, database) => {
    if (err) {
        console.log('Database connection fail.', err);
    } else {
        db = database;
    }
});

module.exports = {
    getCollection: (table_name) => {
        return db.collection(table_name, (err, collection) => {
            if (err) {
                console.log('Get collection error.', err, table_name);
                return null;
            }
            return collection;
        });
    }
};
