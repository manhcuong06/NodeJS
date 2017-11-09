const IN_STOCK = 1;
const SOLD_OUT = 2;

const STATUS_VALUES = [0, 1, 2];
const STATUS_LABELS = [null, 'In Stock', 'Sold Out'];
const STATUS_OPTIONS = [
    { value: null, label: 'Select Status' },
    { value: IN_STOCK, label: 'In Stock' },
    { value: SOLD_OUT, label: 'Sold Out' },
];

module.exports = {
    getStatusLabels: () => {
        return STATUS_LABELS;
    },
    getStatusOptions: () => {
        return STATUS_OPTIONS;
    },
    getSuccessMessage: (message = '') => {
        var message = {
            class: 'success',
            content: message,
        };
        return message;
    },
    getErrorMessage: (message = 'Fail.') => {
        var message = {
            class: 'danger',
            content: message,
        };
        return message;
    },
};