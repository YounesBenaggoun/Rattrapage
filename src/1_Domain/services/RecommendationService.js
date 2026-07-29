
export default class RecommendationService {
    constructor(config, distanceService) {
        this.config = config;
        this.getDistanceService = distanceService;
    }
    adaptExposition(exposition) {
        exposition.theme = exposition.theme?.name;
        exposition.availableSlots = exposition.maxVisitor - exposition.reservationCount;
        exposition.crowd = exposition.reservationCount;
        exposition.businessPriority = 0;
        return exposition;
    }
    async calculateScore({ visitor, exposition }) {
        exposition = this.adaptExposition(exposition);
        const distance = await this.getDistanceService(visitor.address, exposition.address);
        let score = 0;

        if (visitor.preferences.includes(exposition.theme))
            score += this.config.themeCoef;

        if (visitor.availableTime >= exposition.duration)
            score += this.config.durationCoef;
        if (distance !== "error")
            score -= distance * this.config.distanceCoef;

        score -= exposition.crowd * this.config.crowdCoef;
        score += exposition.availableSlots * this.config.availableSlotsCoef;
        return {
            score,
            distance
        }
    }
    async all(visitor, expositions) {
        const expoWithScore = await Promise.all(
            expositions.map(async (element) => {
                const {score,distance} = await this.calculateScore({
                    visitor,
                    exposition: element,
                });
                return {
                    ...element,
                    distance,
                    score
                };
            })
                
        );
        const sortedExpositions = expoWithScore.sort((a, b) => b.score - a.score);
        return sortedExpositions;
    }
}