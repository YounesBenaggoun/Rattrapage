const Exposition = require("../../../1_Domain/entities/Exposition");



class ExpositionGetAll {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }
    async execute() {

        const list = await this.expositionRepository.getAll();
        return list;
    }
}

module.exports = ExpositionGetAll;