import RecommendationConfig from "../../../1_Domain/entities/RecommendationConfig.js";

export default class RecommendationConfigGetUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(recommendationConfig) {
        return await this.repository.update(recommendationConfig);
    }
}

