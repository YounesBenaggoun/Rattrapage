import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";

import ExpositionAdd from "../../2_Application/usecases/Exposition/Exposition.Add.usecase.js";
import ExpositionGetAll from "../../2_Application/usecases/Exposition/Exposition.getAll.usecase.js";

const repository = new ExpositionRepository();

const expositionAdd = new ExpositionAdd(repository);
const expositionGetAll = new ExpositionGetAll(repository);

const Controller = {};

Controller.add = async (req, res) => {
    try {
        const result = await expositionAdd.execute(req.body);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

Controller.getAll = async (req, res) => {
    try {
        const result = await expositionGetAll.execute();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            source: "Exposition controller",
            message: error.message,
        });
    }
};
export default Controller;