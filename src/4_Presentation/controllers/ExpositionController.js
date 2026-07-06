





const ExpositionRepository = require("../../3_InfraStructure/Repositories/ExpositionRepository");

const ExpositionAdd = require("../../2_Application/usecases/Exposition/Exposition.Add.case");
const ExpositionGetAll = require("../../2_Application/usecases/Exposition/Exposition.getAll.case");


const expositionAdd = new ExpositionAdd(new ExpositionRepository);
const expositionGetAll = new ExpositionGetAll(new ExpositionRepository);

exports.add = async (req, res, next) => {
    try {
        const result = await expositionAdd.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
exports.getAll = async (req, res, next) => {

    try {
        const result = await expositionGetAll.execute();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            source: "Exposition controller",
            message: error.message
        })
    }
}