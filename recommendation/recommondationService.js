export default class RecommendationService {
    calculateScore(visitor, exhibition) {
        let score = 0;
        if (visitor.preferences.includes(exhibition.category))
            score += 40;
        if (visitor.availableTime >= exhibition.estimatedVisitTime)
            score += 20;
        score -= exhibition.distance * 0.05;
        score -= exhibition.crowd * 0.4;
        score += exhibition.availableSlots * 2;
        score += exhibition.businessPriority * 10;
        return score;
    }
    recommend(visitor, exhibitions) {
        return exhibitions
            .map(exhibition => ({
                ...exhibition,
                score: this.calculateScore(visitor, exhibition)
            }))
            .sort((a, b) => b.score - a.score);
    }
}