export default class ExpositionGetByExposerId {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }
    async execute(exposerId) {
        const list = await this.expositionRepository.findExpositionByExposerId(exposerId);
        return list;
    }
}