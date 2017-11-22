var ObjectId = require('mongodb').ObjectID;
var DbConnection = require('../libraries/mongodb_module');

module.exports = class Model {
    constructor() { }

    static getObjectId(id) {
        if (Model.isValid(id)) {
            return ObjectId(id);
        }
        return null;
    }

    static isValid(id) {
        const ID_PATTERN = /^[0-9a-fA-F]{24}$/;
        return ID_PATTERN.test(id);
    }

    static async find(collection_name, conditions = {}, sort = {}, skip = 0, limit = 0) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).find(conditions).sort(sort).skip(skip).limit(limit).toArray();
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async findOne(collection_name, conditions) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).findOne(conditions);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async insert(collection_name, data) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).insert(data);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async update(collection_name, conditions, data) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).update(conditions, { $set: data });
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async delete(collection_name, conditions) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).remove(conditions);
            return result;
        } catch (e) {
            console.log(e);
        }
    }

    static async count(collection_name, conditions = {}, options = {}) {
        try {
            var db = await DbConnection.Get();
            var result = await db.collection(collection_name).count(conditions, options);
            return result;
        } catch (e) {
            console.log(e);
        }
    }
}
