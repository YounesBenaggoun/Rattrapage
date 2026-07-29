import RecommendationConfig from "../../../1_Domain/entities/RecommendationConfig.js";

export default class RecommendationConfigGetUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.get();
    }
}

