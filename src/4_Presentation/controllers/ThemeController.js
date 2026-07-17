import ThemeRepository from "../../3_InfraStructure/Repositories/Theme.Repository.js";

import AddTheme from "../../2_Application/usecases/Theme/Theme.add.usecase.js";
import GetAllTheme from "../../2_Application/usecases/Theme/Theme.getAll.usecase.js";
import UpdateTheme from "../../2_Application/usecases/Theme/Theme.update.usecase.js";



const repository = new ThemeRepository();

const useAddTheme = new AddTheme(repository);
const useGetAllTheme = new GetAllTheme(repository);
const useUpdateTheme = new UpdateTheme(repository);



const Controller = {}

Controller.add = async (req, res) => {
    try {

        const result = await useAddTheme.execute(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

Controller.getAll = async (req, res) => {
    try {
        const result = await useGetAllTheme.execute();
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
Controller.update = async (req, res) => {
    try {
        const { id } = req.params;
        const theme = await useUpdateTheme.execute(id, req.body);
        if (!theme) {
            return res.status(404).json({
                message: "Theme not found",
            });
        }
        res.status(200).json(theme);
    } catch (error) {
        res.status(500).json({
            source: "controller.update.theme",
            message: error.message,
        });
    }
};



export default Controller;