



class ExpositionGetAll {
    constructor(expositionRepository) {
        this.expositionRepository = expositionRepository;
    }
    async execute() {

        const list = await this.expositionRepository.getAll();
        return list;
    }
}

export default ExpositionGetAll;