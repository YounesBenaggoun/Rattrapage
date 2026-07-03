const ExpositionContract = require('../../1_Domain/contracts/ExpositionContract');


const Exposition = require("../database/models/Exposition.model");




class ExpositionRepository extends ExpositionContract {
    constructor() {
        super();
    }
    async save(exposition) {
        const newExposition = await Exposition.create(exposition)
        return newExposition;
    }


}


module.exports = ExpositionRepository;