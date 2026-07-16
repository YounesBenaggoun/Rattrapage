import ThemeRepository from "../../3_InfraStructure/Repositories/Theme.Repository.js";
import AddTheme from "../../2_Application/usecases/Theme/Theme.add.usecase.js";

import GetAllTheme from "../../2_Application/usecases/Theme/Theme.getAll.usecase.js";





const repository = new ThemeRepository();

const addTheme = new AddTheme(repository);
const getAllTheme = new GetAllTheme(repository);



const Controller = {}

Controller.add = async (req, res) => {
    try {
        
        const result = await addTheme.execute(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Controller.getAll = async (req, res) => {
    try {
        const result = await getAllTheme.execute();
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}



export default Controller;