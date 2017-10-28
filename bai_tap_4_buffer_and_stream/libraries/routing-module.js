var url = require('url');
var stream_module = require('./stream-module');

const VALID_ROUTES = ['/ban-ra', '/mua-vao', '/them-ty-gia', '/cap-nhat-ty-gia', '/thong-ke-giao-dich'];
const VALID_GET_APIS = ['/danh-sach-giao-dich', '/ty-gia'];
const VALID_ASSETS = [ '.css', '.js' ];

module.exports = {
    handleGetRequest: (req, res) => {
        var path = url.parse(req.url).pathname;

        if (path == '/') {
            stream_module.renderHTML(res, '/home');
        } else if (VALID_ROUTES.indexOf(path) !== -1) {
            stream_module.renderHTML(res, path);
        } else if (VALID_GET_APIS.indexOf(path) !== -1) {
            var data = stream_module.readData(path);
            stream_module.responeData(res, data);
        } else if (path.endsWith('.css') || path.endsWith('.js')) {
            stream_module.renderAsset(res, path);
        } else {
            stream_module.renderHTML(res, '/not-found');
        }
    },
    handlePostRequest: (req, res, data) => {
        var exchanges  = JSON.parse(stream_module.readData(VALID_GET_APIS[0]));
        var currencies = JSON.parse(stream_module.readData(VALID_GET_APIS[1]));
        var currency   = currencies.find(currency => currency.loai_tien == data.loai_tien);

        var new_stt = 1;
        if (exchanges.length > 0) {
            new_stt = exchanges[exchanges.length - 1].stt + 1;
        }

        var path = url.parse(req.url).pathname;
        if (path == '/ban-tien') {
            var exchange = {
                stt: new_stt,
                loai_tien: data.loai_tien,
                so_tien_ban: data.so_tien_ban,
                so_tien_mua: 0,
                don_gia: currency.don_gia_ban,
                thanh_tien: data.so_tien_ban * currency.don_gia_ban,
                thoi_gian_giao_dich: new Date().getTime(),
                loai_giao_dich: "ban"
            }
            exchanges.push(exchange);
            stream_module.writeData(res, VALID_GET_APIS[0], exchanges);
        } else if (path == '/mua-tien') {
            var exchange = {
                stt: new_stt,
                loai_tien: data.loai_tien,
                so_tien_ban: 0,
                so_tien_mua: data.so_tien_mua,
                don_gia: currency.don_gia_mua,
                thanh_tien: data.so_tien_mua * currency.don_gia_mua,
                thoi_gian_giao_dich: (new Date()).getTime(),
                loai_giao_dich: 'mua'
            }
            exchanges.push(exchange);
            stream_module.writeData(res, VALID_GET_APIS[0], exchanges);
        } else if (path == '/them-ty-gia') {
            currencies.push(data);
            stream_module.writeData(res, VALID_GET_APIS[1], currencies);
            res.end();
        } else if (path == '/cap-nhat-ty-gia') {
            currencies.map((currency, index) => {
                if (currency.loai_tien == data.loai_tien) {
                    currencies[index] = data;
                }
            });
            stream_module.writeData(res, VALID_GET_APIS[1], currencies);
            res.end();
        }
    },
}