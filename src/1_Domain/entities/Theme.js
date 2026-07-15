class Theme {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.validate();
    }
    validate() {
        if (!this.name) {
            throw new Error("Theme.name must not be empty");
        }
    }
}

export default Theme;