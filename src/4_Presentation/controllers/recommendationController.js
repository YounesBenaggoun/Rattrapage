import RecommendationConfigGetUseCase from "../../2_Application/usecases/RecommendationConfig/RecommendationConfig.get.usecase.js";
import RecommendationConfigUpdateUseCase from "../../2_Application/usecases/RecommendationConfig/RecommendationConfig.update.usecase.js";

import RecommendationConfigRepository from "../../3_InfraStructure/Repositories/RecommendationConfig.Repository.js";


import RecommendationGetUseCase from "../../2_Application/usecases/Recommendation/Recommendation.get.usecase.js";


import RecommendationService from "../../1_Domain/services/RecommendationService.js";
import DistanceService from "../Services/DistanceService.js";

import recommendationConfig, { loadRecommendationConfig } from "../../3_InfraStructure/config/recommendation.config.js";


import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";



const expositionRepository = new ExpositionRepository();


const recommendationConfigRepository = new RecommendationConfigRepository();
const recommendationConfigGetUseCase = new RecommendationConfigGetUseCase(recommendationConfigRepository);
const recommendationConfigUpdateUseCase = new RecommendationConfigUpdateUseCase(recommendationConfigRepository);

async function loadConfigHelper() {
    await loadRecommendationConfig(recommendationConfigRepository);
    const recommendationService = new RecommendationService(recommendationConfig, DistanceService);
    const recommendationUseCase = new RecommendationGetUseCase(recommendationService);
    return {
        recommendationService,
        recommendationUseCase
    }
}








const Controller = {}


Controller.getRecommendation = async (req, res) => {
    try {
        const {recommendationService,recommendationUseCase} =  await loadConfigHelper()

        const visitor = req.body;
        const list = await expositionRepository.getAll();
        const result = await recommendationUseCase.execute(visitor, list);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

Controller.getConfig = async (req, res) => {
    try {
        const result = await recommendationConfigGetUseCase.execute();
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

Controller.updateConfig = async (req, res) => {
    try {
        const result = await recommendationConfigUpdateUseCase.execute(req.body);
        res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export default Controller;