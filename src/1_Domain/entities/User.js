import { isValidRole, Role } from "./Role.js";
import AppError from "../error/AppError.js";

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
            throw new AppError("Invalid email address", 400);
        }

        if (!this.name || this.name.trim().length === 0) {
            throw new AppError("Name cannot be empty", 400);
        }

        if (!isValidRole(this.role)) {
            throw new AppError(`Invalid role: ${this.role}`, 400);
        }
    }

    static isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

export default User;