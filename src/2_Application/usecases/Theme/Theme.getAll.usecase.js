import Theme from "../../../1_Domain/entities/Theme.js";

class AddTheme {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.getAll();
    }
}

export default AddTheme;