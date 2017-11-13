var Model = require('./_model');

const COLLECTION_NAME = 'bill_detail';

module.exports = class BillDetail extends Model {
    constructor() {}

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async insert(details) {
        return await Model.insert(COLLECTION_NAME, details);
    }
};