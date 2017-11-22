var Model = require('./_model');

const COLLECTION_NAME = 'product';

module.exports = class Product extends Model {
    constructor() {}

    static async find(conditions = {}, sort = {}, skip = 0, limit = 0) {
        return await Model.find(COLLECTION_NAME, conditions, sort, skip, limit);
    }

    static async findOne(conditions) {
        return await Model.findOne(COLLECTION_NAME, conditions);
    }

    static async insert(product) {
        return await Model.insert(COLLECTION_NAME, product);
    }

    static async update(conditions, product) {
        return await Model.update(COLLECTION_NAME, conditions, product);
    }

    static async delete(conditions) {
        return await Model.delete(COLLECTION_NAME, conditions);
    }
};