var Model = require('./_model');

const COLLECTION_NAME = 'bill';

module.exports = class Bill extends Model {
    constructor() {}

    static async find(conditions = {}, sort = {}, skip = 0, limit = 0) {
        return await Model.find(COLLECTION_NAME, conditions, sort, skip, limit);
    }

    static async findOne(conditions) {
        return await Model.findOne(COLLECTION_NAME, conditions);
    }

    static async insert(bill) {
        return await Model.insert(COLLECTION_NAME, bill);
    }

    static async update(conditions, bill) {
        return await Model.update(COLLECTION_NAME, conditions, bill);
    }

    static async count(conditions = {}, options = {}) {
        return await Model.count(COLLECTION_NAME, conditions, options);
    }
};