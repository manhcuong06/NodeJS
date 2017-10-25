var url = require('url');
var stream_module = require('./stream-module');

const VALID_ROUTES = ['/ban-ra', '/cap-nhat-ty-gia', '/mua-vao', '/thong-ke-giao-dich'];
const VALID_APIS = ['/danh-sach-giao-dich'];

module.exports = {
    handleRequest: (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var path = url.parse(req.url).pathname;
        var api_index = VALID_APIS.indexOf(path);

        if (path == '/') {
            stream_module.createMockupData();
            stream_module.renderHTML(res, '/home');
        } else if (VALID_ROUTES.indexOf(path) !== -1) {
            stream_module.renderHTML(res, path);
        } else if (VALID_APIS.indexOf(path) !== -1) {
            stream_module.readFile(res, path);
        } else {
            stream_module.renderHTML(res, '/not-found');
        }
    },
}