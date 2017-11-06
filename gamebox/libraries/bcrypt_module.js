var bcrypt = require('bcrypt');

module.exports = {
    cryptPassword: (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return callback(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                return callback(err, hash);
            });
        });
    },
    comparePassword: (plainPass, hashword, callback) => {
        bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
            return err ? callback(err) : callback(null, isPasswordMatch);
        });
    }
}