var Model = require('./_model');

const COLLECTION_NAME = 'conversation';

module.exports = class Conversation extends Model {
    constructor() {}

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async findOne(conditions) {
        return await Model.findOne(COLLECTION_NAME, conditions);
    }

    static async insert(conversation) {
        return await Model.insert(COLLECTION_NAME, conversation);
    }
};