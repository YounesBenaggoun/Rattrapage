
class RecommendationGetUseCase {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;


    }
    async execute(visitor, expositions ) {
        const result = await this.recommendationService.all(visitor,expositions)
        return result;
    }
}
export default RecommendationGetUseCase;