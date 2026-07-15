import { expoA } from "./exposition.js";
import { visitorA } from "./visitor.js";
import RecommendationService from "./recommondationService.js";

let tab = [
    {
        id: 10,
        title: "Wild Animals",
        category: "Nature",
        estimatedVisitTime: 30,
        capacity: 100,

        distance: 120, // mètres
        crowd: 25,
        availableSlots: 8,
        businessPriority: 2
    },
    {
        id: 9,
        title: "Wild Animals",
        category: "Nature",
        estimatedVisitTime: 20,
        capacity: 100,

        distance: 120, // mètres
        crowd: 25,
        availableSlots: 8,
        businessPriority: 2
    }
]


const service = new RecommendationService();

let result = service.calculateScore(visitorA, expoA);
let result2 = service.recommend(visitorA, tab);

console.log(result2);
