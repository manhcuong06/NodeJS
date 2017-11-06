var db = require('../libraries/mongodb_module');
var ObjectID = require('mongodb').ObjectID;

const ID_PATTERN = /^[0-9a-fA-F]{24}$/;

module.exports = class Model {
    constructor() { }

    static getArrayData(table_name, conditions = {}, callback) {
        var collection = db.getCollection(table_name);
        collection.find(conditions).toArray((err, array_data) => {
            callback(array_data);
        });
    }

    static getDataById(table_name, id, callback) {
        if (Model.isValid(id)) {
            var collection = db.getCollection(table_name);
            collection.findOne({_id: ObjectID(id)}, (err, data) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, data);
                }
            });
        }
        else {
            callback('Id is not valid.');
        }
    }

    static deleteData(table_name, id, callback) {
        var collection = db.getCollection(table_name);
        collection.remove({_id: ObjectID(id)}, () => {
            callback();
        });
    }

    static isValid(id) {
        return ID_PATTERN.test(id);
    }
};