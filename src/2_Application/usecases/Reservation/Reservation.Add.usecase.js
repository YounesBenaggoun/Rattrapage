import Reservation from "../../../1_Domain/entities/Reservation.js";
import AppError from "../../../1_Domain/error/AppError.js";



class ReservationAdd {
    constructor(reservationRepository, expositionRepository) {
        this.reservationRepository = reservationRepository;
        this.expositionRepository = expositionRepository;
    }

    async execute({
        visitorId,
        expositionId
    }) {
        const exposition = await this.expositionRepository.findById(expositionId);
        if (!exposition) {
            throw new AppError("Exposition not Found", 404);
        }
        const totalReservations = await this.reservationRepository.countReservationByExposition({
            expositionId: expositionId,
            status: true,
        });

        if (totalReservations >= exposition.maxVisitor) {
            throw new AppError("Exposition is full", 400);
        }
        const alreadyReserved = await this.reservationRepository.findOne({
            visitorId,
            expositionId
        });

        if (alreadyReserved) {
            throw new AppError("Visitor already Reserved", 409);
        }
        console.log(visitorId, expositionId);
        const newReservation = new Reservation({
            visitorId,
            expositionId,
            status: true
        })
        return await this.reservationRepository.save(newReservation);
    }
}

export default ReservationAdd;