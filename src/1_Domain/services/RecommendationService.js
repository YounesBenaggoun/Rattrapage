
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
            score += this.config.preferenceCoef;

        if (visitor.availableTime >= exposition.duration)
            score += this.config.durationCoef;

        if (distance !== "error")
            score -= distance * this.config.distancePinality;

        score -= exposition.crowd * this.config.crowdPinality;

        score += exposition.availableSlots * this.config.availableSlotsCoef;


        // Bussiness Priority Bonus

        const businessPriority = this.config.businessPriority[exposition.id];
        score += Number(businessPriority || 0)
        
        //-----------------------------------------
        // Heuristique Crowd , exposition Vide
        //-----------------------------------------
        if (exposition.crowd < this.config.bonusLowCrowdTrigger) {
            score += this.config.bonusLowCrowd;
        }
        //-----------------------------------------
        // Heuristique trés proche
        //-----------------------------------------

        if (distance < this.config.bonnusNearTrigger) {
            score += this.config.bonusNear;
        }
         //-----------------------------------------
        // Heuristique Trop loin
        //-----------------------------------------

        if (distance > this.config.maxDistance) {
            score = 0;
            
        }



        return {
            score,
            distance
        }
    }
    async all(visitor, expositions) {
        const expoWithScore = await Promise.all(
            expositions.map(async (element) => {
                const { score, distance } = await this.calculateScore({
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