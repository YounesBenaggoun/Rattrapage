import ExpositionInterface from "../../1_Domain/interface/Exposition.Interface.js";
import Exposition from "../database/models/Exposition.model.js";
import ReservationModel from "../database/models/Reservation.model.js";

class ExpositionRepository extends ExpositionInterface {
    constructor() {
        super();
    }

    async save(exposition) {
        const newExposition = await Exposition.create(exposition);
        return newExposition;
    }

    async getAll() {
        const expositionList = await Exposition.find().populate("theme", "name description");

        const result = await Promise.all(
            expositionList.map(async (exposition) => {
                const reservationCount = await ReservationModel.countDocuments({
                    expositionId: exposition._id,
                });

                return {
                    ...exposition.toObject(),
                    reservationCount,
                };
            })
        );

        return result;
    }
    async findById(expositionId) {
        const exposition = await Exposition.findById(expositionId)
            .populate("theme", "name description");
        return exposition
    }
}

export default ExpositionRepository;