import getDistanceBetween from "./DistanceService.js";

let result = {};

const adapt = async function ({ visitor, exposition }) {


    result = {};
    result.theme = exposition.theme.name;
    result.duration = exposition.duration;
    result.distance = await getDistance(visitor.address, exposition.address);
    result.availableSlots = exposition.maxVisitor - exposition.reservationCount;
    result.crowd = exposition.reservationCount;

    console.log(result);

}

async function getDistance(a, b) {
    try {
        return result.distance = await getDistanceBetween(a, b);
    } catch (error) {
        return result.distance = false;
    }
}




export default adapt;