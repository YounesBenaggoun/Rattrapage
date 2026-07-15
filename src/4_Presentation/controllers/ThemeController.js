import ThemeRepository from "../../3_InfraStructure/Repositories/Theme.Repository.js";
import AddTheme from "../../2_Application/usecases/Theme/Theme.add.usecase.js";





const repository = new ThemeRepository();

const addTheme = new AddTheme(repository);


const add = async (req, res) => {
    try {
        console.log(req.body);
        const result = await addTheme.execute(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export default {
    add
};