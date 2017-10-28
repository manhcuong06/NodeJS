var fs = require('fs');

const HEADER = fs.readFileSync('./views/widgets/header.html').toString();
const FOOTER = fs.readFileSync('./views/widgets/footer.html').toString();

const VIEW_FOLDER = './views/pages';
const HTML_EXT = '.html';

const DATA_FOLDER = './database';
const JSON_EXT = '.json';

module.exports = {
    renderHTML: (res, file_name) => {
        var body = fs.readFileSync(VIEW_FOLDER + file_name + HTML_EXT).toString();
        res.write(HEADER + body + FOOTER);
        res.end();
    },
    renderAsset: (res, file_name) => {
        var content = fs.readFileSync('.' + file_name);
        res.end(content);
    },
    readData: (file_name) => {
        var data = fs.readFileSync(DATA_FOLDER + file_name + JSON_EXT).toString();
        return data;
    },
    writeData: (res, file_name, data) => {
        fs.writeFileSync(DATA_FOLDER + file_name + JSON_EXT, JSON.stringify(data));
        res.end('Write');
    },
    responeData: (res, data) => {
        res.write(data);
        res.end();
    },
}