var fs = require('fs');

const STYLE  = fs.readFileSync('./assets/css/style.css').toString();
const HEADER = fs.readFileSync('./views/widgets/header.html').toString().replace('MY_STYLE', `<style>${STYLE}</style>`);;
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
    readFile: (res, file_name) => {
        var read_stream = fs.createReadStream(DATA_FOLDER + file_name + JSON_EXT);
        var result;

        read_stream.on('data', (data) => {
            result = data.toString();
        });
        read_stream.on('end', () => {
            responeJson(res, result);
        });
    },
    writeFile: (res, file_name, data) => {
        res.end();
    },
    createMockupData: () => {
        var ds_giao_dich = [];
        for (var i=1; i<=15; i++) {
            ds_giao_dich.push({
                stt: i,
                loai_tien: 'USD',
                so_tien_ban: i * 1000,
                don_gia: 22770,
                so_tien_thu_vao: i * 1000 * 22770,
                thoi_gian_giao_dich: getDatetimeFormat(),
            });
        }
        var write_stream = fs.createWriteStream(DATA_FOLDER + '/danh-sach-giao-dich' + JSON_EXT);
        write_stream.write(JSON.stringify(ds_giao_dich));
        write_stream.end();
    },
}

responeJson = (res, result) => {
    res.write(result);
    res.end();
}

getDatetimeFormat = () => {
    var current_date = new Date();
    return current_date.toLocaleString();
}