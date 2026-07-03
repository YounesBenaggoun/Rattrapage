const Exposition = require("../../../1_Domain/entities/Exposition");



class ExpositionAdd {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }
    async execute({
        id,
        title,
        adress,
        theme,
        description,
        maxVisitor,
        maxExposer,
        startTime,
        endTime,
    }) {
        const exposition = new Exposition({
            id,
            title,
            adress,
            theme,
            description,
            maxVisitor,
            maxExposer,
            startTime,
            endTime
        })
        const newExposition = await this.expositionRepository.save(exposition);
        return newExposition;
    }
}

module.exports = ExpositionAdd;