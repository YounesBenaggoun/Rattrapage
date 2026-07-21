import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";

import adaptExposition from "../Service/recommendationService/adaptExposition.js";
import RecommendationService from "../Service/recommendationService/recommondationService.js";
import getDistanceBetween from "../Service/recommendationService/DistanceService.js";

const expositionRepository = new ExpositionRepository();


const Controller = {}

const recommendationConfig = {
    themeCoef: 40,
    distanceCoef: 0.05,
    durationCoef: 20,
    crowdCoef: 0.4,
    availableSlotsCoef: 2,
}

const recommendation = new RecommendationService(recommendationConfig);


const visitor = {
    availableTime: 120, // minutes
    preferences: [
        "Nature",
        "Portrait"
    ],
    address: "6 place lucie Aubrac, 92220 bagneux, france",
}



Controller.getRecommendation = async (req, res) => {
    try {
        const list = await expositionRepository.getAll();
        const result = await recommendation.all(visitor, list);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }

}

export default Controller;