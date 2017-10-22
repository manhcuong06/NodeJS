const EN = 0;
const VI = 1;

const FULL = 0;
const SHORT = 1;

const months_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
const days_en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

exports.MyDate = class MyDate {
    constructor(date) {
        this.date = new Date(date);
    }

    formatDate(language, format) {
        var year  = this.date.getFullYear();
        var month = this.date.getMonth();
        var date  = this.date.getDate();
        var day   = this.date.getDay();
        if (language == EN) {
            if (format == FULL) {
                return `${days_en[day]} ${date} ${months_en[month]} ${year}`;
            } else {
                return `${month + 1}/${date}/${year}`;
            }
        } else {
            if (format == FULL) {
                day = day ? `Thứ ${day + 1}` : 'Chủ Nhật';
                return `${day} ngày ${date} tháng ${month + 1} năm ${year}`;
            } else {
                return `${date}/${month + 1}/${year}`;
            }
        }
    }
};