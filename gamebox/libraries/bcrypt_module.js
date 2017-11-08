var bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    encrypt: async (plain_text) => {
        var hash = await bcrypt.hash(plain_text, SALT_ROUNDS);
        return hash;
    },
    compare: async (plain_text, hash_text) => {
        var result = await bcrypt.compare(plain_text, hash_text);
        return result;
    }
}