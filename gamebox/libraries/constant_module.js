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
    getLevelOptions: () => {
        return LEVEL_OPTIONS;
    },
    isCustomer: (level) => {
        return level == CUSTOMER;
    }
}