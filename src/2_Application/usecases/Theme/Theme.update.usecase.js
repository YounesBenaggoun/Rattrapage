class UpdateTheme {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(id, themeData) {
        return await this.repository.update(id, themeData);
    }
}

export default UpdateTheme;