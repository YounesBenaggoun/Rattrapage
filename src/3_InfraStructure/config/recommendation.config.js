const recommendationConfig = {
    preferenceCoef: 40,
    distancePinality: 0.05,
    durationCoef: 20,
    crowdPinality: 0.4,
    availableSlotsCoef: 2,
    businessPriority: {
        "6a69d00425a3f5b363ba646b" : 25,
        "6a69e0a0c31ff145a61c97e8" : 8,
        "6a69e0d3c31ff145a61c97e9" : 11
    },
    maxDistance: 40,
    bonusLowCrowdTrigger : 30,
    bonusNear: 10,
    bonnusNearTrigger : 15,
    bonusLowCrowd: 15

}

export default recommendationConfig;


