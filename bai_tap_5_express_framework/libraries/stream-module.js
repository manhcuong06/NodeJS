var fs = require('fs');

const HEADER = fs.readFileSync('./views/widgets/header.html').toString();
const LOGIN_LINK = fs.readFileSync('./views/widgets/login-link.html').toString();
const LOGOUT_LINK = fs.readFileSync('./views/widgets/logout-link.html').toString();
const MENU_END = fs.readFileSync('./views/widgets/menu-end.html').toString();
const FOOTER = fs.readFileSync('./views/widgets/footer.html').toString();

const VIEW_FOLDER = './views/pages';
const HTML_EXT = '.html';

const DATA_FOLDER = './database/';
const JSON_EXT = '.json';

module.exports = {
    renderHTML: (res, file_name, current_user, error_message = null) => {
        var link = LOGIN_LINK;
        if (current_user) {
            link = LOGOUT_LINK
                .replace('CURRENT_USER_ID', current_user.id)
                .replace('CURRENT_USER_FULLNAME', current_user.fullname)
            ;
        }
        var body = fs.readFileSync(VIEW_FOLDER + file_name + HTML_EXT).toString();
        if (error_message !== null) {
            body = body.replace('ERROR_MESSAGE', error_message);
        }
        res.send(HEADER + link + MENU_END + body + FOOTER);
    },
    renderAsset: (res, file_name) => {
        var content = fs.readFileSync('.' + file_name);
        res.end(content);
    },
    readData: (file_name) => {
        var data = fs.readFileSync(DATA_FOLDER + file_name + JSON_EXT).toString();
        return data;
    },
    writeData: (file_name, data) => {
        fs.writeFileSync(DATA_FOLDER + file_name + JSON_EXT, JSON.stringify(data));
    },
}