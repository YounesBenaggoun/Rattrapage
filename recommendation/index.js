import RecommendationService from "./recommondationService.js";
import { expositions as exposition } from "./exposition.js";
import adapt from "./adapt.js";

const visitor = {
    availableTime: 120, // minutes
    preferences: [
        "Nature",
        "Portrait"
    ],
    address: "6 place lucie Aubrac, 92220 bagneux, france",
}

adapt({visitor , exposition});







let tab = [
    {
        theme: "Nature",
        duration: 20,
        businessPriority: 2,


        distance: 120, // mètres

        crowd: 25,
        availableSlots: 8,


    },
    {

        theme: "Nature",
        duration: 20,
        distance: 120, // mètres


        crowd: 25,
        availableSlots: 8,
        businessPriority: 20
    }
]


// const service = new RecommendationService();

// let result = service.calculateScore(visitor, expo);
// let resultTab = service.recommend(visitor, tab);


