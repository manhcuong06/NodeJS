var Model = require('./_model');

const COLLECTION_NAME = 'gallery';

module.exports = class Gallery extends Model {
    constructor() { }

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async findOne(conditions) {
        return await Model.findOne(COLLECTION_NAME, conditions);
    }

    static async insert(gallery) {
        return await Model.insert(COLLECTION_NAME, gallery);
    }

    static async update(conditions, gallery) {
        return await Model.update(COLLECTION_NAME, conditions, gallery);
    }

    static async delete(conditions) {
        return await Model.delete(COLLECTION_NAME, conditions);
    }
};