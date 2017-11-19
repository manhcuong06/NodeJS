var Model = require('./_model');

const COLLECTION_NAME = 'message';

module.exports = class Message extends Model {
    constructor() {}

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async insert(message) {
        return await Model.insert(COLLECTION_NAME, message);
    }
};