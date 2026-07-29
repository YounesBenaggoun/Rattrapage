export default class RecommendationConfig {
    constructor({
        id = null,
        preferenceCoef = 40,
        distancePenalty = 0.05,
        durationCoef = 20,
        crowdPenalty = 0.4,
        availableSlotsCoef = 2,
        maxDistance = 40,
        bonusLowCrowdTrigger = 30,
        bonusNearTrigger = 15,
        bonusNear = 10,
        bonusLowCrowd = 15,
        businessPriority = {},
        createdAt = null,
        updatedAt = null,
    }) {
        this.id = id;
        this.preferenceCoef = preferenceCoef;
        this.distancePenalty = distancePenalty;
        this.durationCoef = durationCoef;
        this.crowdPenalty = crowdPenalty;
        this.availableSlotsCoef = availableSlotsCoef;
        this.maxDistance = maxDistance;
        this.bonusLowCrowdTrigger = bonusLowCrowdTrigger;
        this.bonusNearTrigger = bonusNearTrigger;
        this.bonusNear = bonusNear;
        this.bonusLowCrowd = bonusLowCrowd;
        this.businessPriority = businessPriority;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;

        this.validate();
    }

    validate() {
        const positiveFields = [
            "preferenceCoef",
            "distancePenalty",
            "durationCoef",
            "crowdPenalty",
            "availableSlotsCoef",
            "maxDistance",
            "bonusLowCrowdTrigger",
            "bonusNearTrigger",
            "bonusNear",
            "bonusLowCrowd",
        ];

        for (const field of positiveFields) {
            if (this[field] < 0) {
                throw new Error(`${field} must be greater than or equal to 0`);
            }
        }

        for (const [expositionId, priority] of Object.entries(this.businessPriority)) {
            if (priority < 0) {
                throw new Error(
                    `Business priority for exposition ${expositionId} must be positive`
                );
            }
        }
    }

    getPriority(expositionId) {
        return this.businessPriority[expositionId] ?? 0;
    }

    setPriority(expositionId, priority) {
        if (priority < 0) {
            throw new Error("Priority must be positive");
        }

        this.businessPriority[expositionId] = priority;
    }

    removePriority(expositionId) {
        delete this.businessPriority[expositionId];
    }
}