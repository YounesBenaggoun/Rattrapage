import getDistanceBetween from "./DistanceService.js";

let result = {};

const adaptExposition = function (exposition) {
    result = {};
    result.theme = exposition.theme.name;
    result.duration = exposition.duration;
    result.address =  exposition.address;
    result.availableSlots = exposition.maxVisitor - exposition.reservationCount;
    result.crowd = exposition.reservationCount;
    result.businessPriority = 0;
    return result;
}

async function getDistance(a, b) {
    try {
        return result.distance = await getDistanceBetween(a, b);
    } catch (error) {
        return result.distance = false;
    }
}




export default adaptExposition;