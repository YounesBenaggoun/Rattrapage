class ITheme {
    constructor() { }
    async create(_theme) {
        throw new Error("Theme.save must be implemented");
    }
    async getAll() {
        throw new Error("Theme.getAll() must be implemented");
    }
    async update(id, themeData) {
        throw new Error("Theme.update() must be implemented");
    }
    async delete(id) {
        throw new Error("Theme.delete() must be implemented");
    }
}


export default ITheme;