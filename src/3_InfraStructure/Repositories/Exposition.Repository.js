import ExpositionInterface from "../../1_Domain/interface/Exposition.Interface.js";
import ExpositionModel from "../database/models/Exposition.model.js";
import ReservationModel from "../database/models/Reservation.model.js";

class ExpositionRepository extends ExpositionInterface {
    constructor() {
        super();
    }
    async delete(id) {
        const deletedExposition = await ExpositionModel.findByIdAndDelete(id);
        return deletedExposition;
    }

    async save(exposition) {
        await ExpositionModel.syncIndexes();
        const newExposition = await ExpositionModel.create(exposition);
        return newExposition;
    }
    async addExposerId(expositionId, exposerId) {
        const exposition = await ExpositionModel.findByIdAndUpdate(
            expositionId,
            {
                $addToSet: {
                    exposerIds: exposerId
                }
            },
            {
                new: true // return updated document
            }
        );
        return exposition;
    }

    async removeExposerId(expositionId, exposerId) {
        const exposition = await ExpositionModel.findByIdAndUpdate(
            expositionId,
            {
                $pull: {
                    exposerIds: exposerId
                }
            },
            {
                new: true
            }
        );

        return exposition;
    }

    async getAll() {
        const expositionList = await ExpositionModel.find().populate("theme", "name description");

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
        const exposition = await ExpositionModel.findById(expositionId)
            .populate("theme", "name description");
        return exposition
    }
}

export default ExpositionRepository;