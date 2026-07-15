import ITheme from "../../1_Domain/interface/Theme.interface.js";
import ThemeModel from "../../3_InfraStructure/database/models/Theme.model.js";

class ThemeRepository extends ITheme {
    constructor() {

    }
    create(theme) {
        const newObjet = await ThemeModel.create(reservation);
        return newObjet;
    }
}