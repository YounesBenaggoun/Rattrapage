import ExpositionContract from "../../1_Domain/contracts/ExpositionContract.js";
import Exposition from "../database/models/Exposition.model.js";

class ExpositionRepository extends ExpositionContract {
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
}

export default ExpositionRepository;