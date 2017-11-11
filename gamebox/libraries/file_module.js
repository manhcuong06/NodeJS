var fs = require('fs');

module.exports = {
    decodeBase64: (dataString) => {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches.length !== 3) {
            return null;
        }
        return {
            name: createFileName(matches[1]),
            data: new Buffer(matches[2], 'base64'),
        };
    },
    upload: (path, file) => {
        fs.writeFileSync(path, file);
    },
    remove: (path) => {
        fs.stat(path, (err, data) => {
            if (!err) {
                fs.unlinkSync(path);
            } else {
                console.log('File does not exist.');
            }
        })
    },
};

function createFileName(file_type) {
    var name = new Date().getTime();
    if (file_type == 'image/jpeg') {
        name += '.jpg';
    } else if (file_type == 'image/png') {
        name += '.png';
    } else if (file_type == 'image/gif') {
        name += '.gif';
    }
    return name;
}