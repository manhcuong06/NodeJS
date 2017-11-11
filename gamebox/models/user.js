var Model = require('./_model');
var bcrypt = require('../libraries/bcrypt_module');

const COLLECTION_NAME = 'user';

module.exports = class User extends Model {
    constructor() { }

    static async find(conditions = {}) {
        return await Model.find(COLLECTION_NAME, conditions);
    }

    static async findOne(conditions) {
        var password = null;
        if (conditions.password) {
            password = conditions.password;
            delete conditions.password;
        }
        var user = await Model.findOne(COLLECTION_NAME, conditions);
        var compare_result = true;
        if (password) {
            compare_result = await bcrypt.compare(password, user.password);
        }
        return compare_result ? user : null;
    }

    static async insert(user) {
        user.created_at = new Date().getTime();
        user.password = await bcrypt.encrypt(user.password);
        return await Model.insert(COLLECTION_NAME, user);
    }

    static async update(conditions, user) {
        if (user.password) {
            user.password = await bcrypt.encrypt(user.password);
        } else {
            delete user.password;
        }
        return await Model.update(COLLECTION_NAME, conditions, user);
    }

    static async delete(conditions) {
        return await Model.delete(COLLECTION_NAME, conditions);
    }
};