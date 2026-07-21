import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";

import adaptExposition from "../Service/recommendationService/adaptExposition.js";
import RecommendationService from "../Service/recommendationService/recommondationService.js";
import getDistanceBetween from "../Service/recommendationService/DistanceService.js";

const expositionRepository = new ExpositionRepository();

const Controller = {}

const recommendation = new RecommendationService();


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
        let exposition = await adaptExposition(list[1]);

        

        // const score = await recommendation.calculateScore({
        //     visitor,
        //     exposition
        // })
        // console.log(score);

        await recommendation.all(visitor, list);






        // return res.status(201).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }

}

export default Controller;