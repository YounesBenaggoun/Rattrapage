const { isValidRole, Role } = require('./Role');


class User {
    constructor({ id, name, email, password, role = Role.VISITOR }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.validate();
    }

    validate() {
        if (!this.email || !User.isValidEmail(this.email)) {
            throw new Error('Invalid email address');
        }
        if (!this.name || this.name.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
        if (!isValidRole(this.role)) {
            throw new Error(`Invalid role: ${this.role}`);
        }
    }
    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

module.exports = User;
