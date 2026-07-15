import Theme from "../../../1_Domain/entities/Theme.js";

class AddTheme {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(theme) {
        return await this.repository.create(theme);
        // return true;
    }
}

export default AddTheme;