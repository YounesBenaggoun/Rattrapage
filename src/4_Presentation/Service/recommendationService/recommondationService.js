import adaptExposition from "./adaptExposition.js";
import getDistanceBetween from "./DistanceService.js";


export default class RecommendationService {
    async calculateScore({ visitor, exposition }) {
        const distance = await getDistanceBetween(visitor.address, exposition.address);
        let score = 0;
        if (visitor.preferences.includes(exposition.theme))
            score += 40;
        if (visitor.availableTime >= exposition.duration)
            score += 20;
        score -= distance * 0.05;
        score -= exposition.crowd * 0.4;
        score += exposition.availableSlots * 2;
        score += exposition.businessPriority * 10;
        return score;
    }
    async all(visitor, expositions) {
        // const expoWithScore = expositions.map(async (element) => {
        //     const exposition = adaptExposition(element);
        //     let tab = await this.calculateScore({ visitor, exposition })
        //     
        // });
        
        const expoWithScore = await Promise.all(
            expositions.map(async (element) => {
                const exposition = adaptExposition(element);
                const score = await this.calculateScore({
                    visitor,
                    exposition,
                });
                return {
                    exposition,
                    score,
                };
            })
        );
        console.log(expoWithScore)
        return expoWithScore;
    }

    recommend(visitor, expositions) {
        return expositions
            .map(exposition => ({
                ...exposition,
                score: this.calculateScore(visitor, exposition)
            }))
            .sort((a, b) => b.score - a.score);
    }
}
