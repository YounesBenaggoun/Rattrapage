import RecommendationGetUseCase from "../../2_Application/usecases/Recommendation/Recommendation.get.usecase.js";


import RecommendationService from "../../1_Domain/services/RecommendationService.js";
import DistanceService from "../Services/DistanceService.js";



import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";
const expositionRepository = new ExpositionRepository();


const Controller = {}
const recommendationConfig = {
    themeCoef: 40,
    distanceCoef: 0.05,
    durationCoef: 20,
    crowdCoef: 0.4,
    availableSlotsCoef: 2,
}
const exposition = {
    _id: '6a69d00425a3f5b363ba646b',
    title: 'Paris 4',
    address: '22 Rue des Halles, 75004 , France',
    theme: {
        name: 'Cuisine',
        description: 'des photos de Cuisine'
    },
    exposerIds: [],
    description: 'Voiture',
    maxVisitor: 3,
    maxExposer: 2,
    duration: 45,
    startDate: "2027-01-01T00:00:00.000Z",
    endDate: "2027-02-02T00:00:00.000Z",
    id: '6a6908c453e7fe12e6a8ac0e',
    reservationCount: 0
}
// const visitor = {
//     availableTime: 120, // minutes
//     preferences: [
//         "Nature",
//         "Portrait"
//     ],
//     address: "6 place lucie Aubrac, 92220 bagneux, france",
// }



const recommendationService = new RecommendationService(recommendationConfig, DistanceService);
const recommendationUseCase = new RecommendationGetUseCase(recommendationService);





Controller.getRecommendation = async (req, res) => {
    try {
        const visitor = req.body;
        const list = await expositionRepository.getAll();
        const result = await recommendationUseCase.execute(visitor, list);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
}

export default Controller;