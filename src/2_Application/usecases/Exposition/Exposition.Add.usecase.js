import Exposition from "../../../1_Domain/entities/Exposition.js";

class ExpositionAdd {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }

    async execute({
        id,
        title,
        address,
        theme,
        description,
        maxVisitor,
        maxExposer,
        startDate,
        endDate,
    }) {
        const exposition = new Exposition({
            id,
            title,
            address,
            theme,
            description,
            maxVisitor,
            maxExposer,
            startDate,
            endDate,
        });

        const newExposition = await this.expositionRepository.save(exposition);
        return newExposition;
    }
}

export default ExpositionAdd;