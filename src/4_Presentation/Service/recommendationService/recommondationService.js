import adaptExposition from "./adaptExposition.js";
import getDistanceBetween from "./DistanceService.js";


export default class RecommendationService {
    constructor({ themeCoef, distanceCoef, durationCoef, crowdCoef, availableSlotsCoef }) {
        this.THEME_COEF = themeCoef;
        this.DISTANCE_COEF = distanceCoef;
        this.DURATION_COEF = durationCoef;
        this.CROWD_COEF = crowdCoef;
        this.AVAILABLESLOTS_COEF = availableSlotsCoef;
    }
    async calculateScore({ visitor, exposition }) {
        const distance = await getDistanceBetween(visitor.address, exposition.address);
        let score = 0;
        if (visitor.preferences.includes(exposition.theme))
            score += this.THEME_COEF;
        if (visitor.availableTime >= exposition.duration)
            score += this.DURATION_COEF;
        if (distance !== "error")
            score -= distance * this.DISTANCE_COEF;

        score -= exposition.crowd * this.CROWD_COEF;
        score += exposition.availableSlots * this.AVAILABLESLOTS_COEF;
        return score;
    }
    async all(visitor, expositions) {
        const expoWithScore = await Promise.all(
            expositions.map(async (element) => {
                const exposition = adaptExposition(element);
                const score = await this.calculateScore({
                    visitor,
                    exposition,
                });
                return {
                    ...element,
                    score
                };
            })
                .sort((a, b) => b.score - a.score)
        );
        return expoWithScore;
    }
}
