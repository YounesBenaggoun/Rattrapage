import ExpositionInterface from "../../1_Domain/interface/Exposition.Interface.js";
import Exposition from "../database/models/Exposition.model.js";

class ExpositionRepository extends ExpositionInterface {
    constructor() {
        super();
    }

    async save(exposition) {
        const newExposition = await Exposition.create(exposition);
        return newExposition;
    }

    async getAll() {
        const expositionList = await Exposition.find();
        return expositionList;
    }
    async findById(expositionId) {
        const exposition = await Exposition.findById(expositionId);
        return exposition
    }
}

export default ExpositionRepository;