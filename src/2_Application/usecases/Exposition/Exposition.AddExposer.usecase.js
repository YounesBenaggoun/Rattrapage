import Exposition from "../../../1_Domain/entities/Exposition.js";
import AppError from "../../../1_Domain/error/AppError.js";


class ExpositionAddExposer {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }

    async execute({
        expositionId,
        exposerId
    }) {
        const dataExpo = await this.expositionRepository.findById(expositionId);
        const exposition = new Exposition(dataExpo);
        if (exposition.isFullOfExposer())
            throw new AppError("Exposition is Full Of Exposer", 409);
        return await this.expositionRepository.addExposerId(expositionId, exposerId);
    }
}

export default ExpositionAddExposer;