class ITheme {
    constructor() { }
    create(_theme) {
        throw new Error("Theme.save must be implemented");
    }
}