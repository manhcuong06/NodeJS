const ADMIN = 1;
const MANAGER = 2;
const STAFF = 3;
const CUSTOMER = 4;
const LEVEL_VALUES = [0, 1, 2, 3, 4];
const LEVEL_LABELS = [null, 'Admin', 'Manager', 'Staff', 'Customer'];
const LEVEL_OPTIONS = [
    { value: null, label: 'Select Level' },
    { value: ADMIN, label: 'Admin' },
    { value: MANAGER, label: 'Manager' },
    { value: STAFF, label: 'Staff' },
    { value: CUSTOMER, label: 'Customer' },
];

module.exports = {
    getLevelLabels: () => {
        return LEVEL_LABELS;
    },
    getLevelOptions: (current_level = 3) => {
        var options = LEVEL_OPTIONS;
        for (var i = 1; i < options.length; i++) {
            if (current_level > options[i].value) {
                options.splice(i, 1);
            }
        }
        return options;
    },
    isCustomer: (level) => {
        return level == CUSTOMER;
    },
    getSuccessMessage: (message = '') => {
        var message = {
            class: 'success',
            content: message,
        };
        return message;
    },
    getErrorMessage: (message = 'The data you are looking for does not exist.') => {
        var message = {
            class: 'danger',
            content: message,
        };
        return message;
    },
}