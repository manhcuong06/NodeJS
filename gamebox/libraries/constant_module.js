const ADMIN = 1;
const MANAGER = 2;
const STAFF = 3;
const CUSTOMER = 4;
const LEVEL_OPTIONS = [
    { value: ADMIN, label: 'Admin' },
    { value: MANAGER, label: 'Manager' },
    { value: STAFF, label: 'Staff' },
    { value: CUSTOMER, label: 'Customer' },
]

module.exports = {
    isCustomer: (level) => {
        return level == CUSTOMER;
    }
}