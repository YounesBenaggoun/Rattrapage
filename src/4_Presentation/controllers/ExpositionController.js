import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";

import ExpositionAdd from "../../2_Application/usecases/Exposition/Exposition.Add.usecase.js";
import ExpositionGetAll from "../../2_Application/usecases/Exposition/Exposition.getAll.usecase.js";
import ExpositionGetByExposerId from "../../2_Application/usecases/Exposition/Exposition.getByExposerId.usecase.js";
import Role  from "../../1_Domain/entities/Role.js";

const repository = new ExpositionRepository();

const expositionAdd = new ExpositionAdd(repository);
const useExpositionGetAll = new ExpositionGetAll(repository);
const useExpositionGetByExposerId = new ExpositionGetByExposerId(repository);

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
        let result;
        if (req.user.role === Role.EXPOSER) {
            result = await useExpositionGetByExposerId.execute(req.user.id);
        } else {
            result = await useExpositionGetAll.execute();
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            source: "Exposition controller",
            message: error.message,
        });
    }
};
export default Controller;