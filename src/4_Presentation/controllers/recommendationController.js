import RecommendationGetUseCase from "../../2_Application/usecases/Recommendation/Recommendation.get.usecase.js";


import RecommendationService from "../../1_Domain/services/RecommendationService.js";
import DistanceService from "../Services/DistanceService.js";

import recommendationConfig from "../../3_InfraStructure/config/recommendation.config.js";


import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";
const expositionRepository = new ExpositionRepository();


const Controller = {}


const recommendationService = new RecommendationService(recommendationConfig, DistanceService);
const recommendationUseCase = new RecommendationGetUseCase(recommendationService);


Controller.getRecommendation = async (req, res) => {
    try {
        const visitor = req.body;
        const list = await expositionRepository.getAll();
        const result = await recommendationUseCase.execute(visitor, list);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

import RecommendationConfigModel from "../../3_InfraStructure/Repositories/RecommendationConfig.Repository.js";

const recommendConfig = new RecommendationConfigModel();
Controller.getConfig = async (req, res) => {
    try {
        const result = await recommendConfig.get();
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

Controller.updateConfig = async (req, res) => {
    try {
        const result = await recommendConfig.update(req.body);
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}



export default Controller;