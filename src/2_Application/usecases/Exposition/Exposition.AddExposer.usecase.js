import Exposition from "../../../1_Domain/entities/Exposition.js";

class ExpositionAddExposer {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }

    async execute({
        expositionId, 
        exposerId
    }) {
        

        const newExposition = await this.expositionRepository.addExposerId(expositionId, exposerId);
        return newExposition;
    }
}

export default ExpositionAdd;