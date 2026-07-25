import IReservation from "../../1_Domain/interface/Reservation.interface.js";
import ReservationModel from "../database/models/Reservation.model.js";



class ReservationRepository extends IReservation {
    constructor() {
        super();
    }
    async save(reservation) {
        await ReservationModel.syncIndexes();
        const newReservation = await ReservationModel.create(reservation);
        return newReservation;
    }

    async countReservationByExposition({ expositionId, status = true }) {
        const totalReservations = await ReservationModel.countDocuments({
            expositionId,
            status
        });
        return totalReservations;
    }
    async findOne({ visitorId, expositionId }) {
        const alreadyReserved = await ReservationModel.findOne({
            visitorId,
            expositionId,
        });
        return alreadyReserved;
    }
    
    async delete(id) {
        await ReservationModel.syncIndexes();
        const newReservation = await ReservationModel.findByIdAndDelete(id);
        return newReservation;

    }
}

export default ReservationRepository;