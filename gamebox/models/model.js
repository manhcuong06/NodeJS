var ObjectId = require('mongodb').ObjectID;
var DbConnection = require('../libraries/mongodb_module');

const ID_PATTERN = /^[0-9a-fA-F]{24}$/;

module.exports = class Model {
    constructor() { }

    static makeId(id) {
        if (Model.isValid(id)) {
            return ObjectId(id);
        }
        return null;
    }

    static isValid(id) {
        return ID_PATTERN.test(id);
    }

    static async getArrayData(collection_name, conditions = {}) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).find(conditions).toArray();
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async getSingleData(collection_name, conditions) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).findOne(conditions);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async insertData(collection_name, data) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).insert(data);
            var inserted_id = result.insertedIds[0];
            return inserted_id;
        } catch (e) {
            console.log(e);
        }
    }

    static async updateData(collection_name, conditions, data) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).update(conditions, data);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async deleteData(collection_name, conditions) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).remove(conditions);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
