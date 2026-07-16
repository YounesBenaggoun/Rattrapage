import ITheme from "../../1_Domain/interface/Theme.interface.js";
import ThemeModel from "../../3_InfraStructure/database/models/Theme.model.js";

class ThemeRepository extends ITheme {
    constructor() {
        super();
    }
    async create(theme) {
        const newObjet = await ThemeModel.create(theme);
        return newObjet;
    }
    async getAll() {
        const result = await ThemeModel.find();
        return result;
    }
}

export default ThemeRepository