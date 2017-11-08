var Model = require('./_model');

const COLLECTION_NAME = 'user';

module.exports = class User extends Model {
    constructor() { }

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async findOne(conditions) {
        return await Model.findOne(COLLECTION_NAME, conditions);
    }

    static async insert(user) {
        return await Model.insert(COLLECTION_NAME, user);
    }

    static async update(conditions, user) {
        return await Model.update(COLLECTION_NAME, conditions, user);
    }

    static async delete(conditions) {
        return await Model.delete(COLLECTION_NAME, conditions);
    }
};