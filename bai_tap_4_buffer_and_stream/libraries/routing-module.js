var fs = require('fs');
var url = require('url');

const HEADER = fs.readFileSync('./views/widgets/header.html').toString();
const FOOTER = fs.readFileSync('./views/widgets/footer.html').toString();
const STYLE  = fs.readFileSync('./assets/css/site.css').toString();

const VIEW_FOLDER = './views/pages';
const VALID_ROUTES = ['/ban-ra', '/cap-nhat-ty-gia', '/mua-vao', '/thong-ke-giao-dich'];
const HTML_EXT = '.html';

module.exports = {
    handleRequest: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var path = url.parse(req.url).pathname;

        if (path == '/') {
            renderHTML('/index', res);
        } else if (VALID_ROUTES.indexOf(path) !== -1) {
            renderHTML(path, res);
        } else {
            renderHTML('/not-found', res);
        }
    },
}

function renderHTML(file_name, res) {
    var body = fs.readFileSync(VIEW_FOLDER + file_name + HTML_EXT).toString();
    var my_header = HEADER.replace('MY_STYLE', `<style>${STYLE}</style>`);
    res.write(my_header + body + FOOTER);
    res.end();
}

function responeJson(data, res) {
    res.write('Test json');
    res.end();
}