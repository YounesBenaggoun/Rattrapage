





const ExpositionRepository = require("../../3_InfraStructure/Repositories/ExpositionRepository");

const ExpositionAdd = require("../../2_Application/usecases/Exposition/Exposition.Add.case");


const expositionAdd = new ExpositionAdd(new ExpositionRepository);

exports.add = async (req, res, next) => {
    try {
        const result = await expositionAdd.execute(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}