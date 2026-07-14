import Reservation from "../../../1_Domain/entities/Reservation.js";

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
            throw new Error("Exposition not Found");
        }
        const totalReservations = await this.reservationRepository.countReservationByExposition({
            expositionId: expositionId,
            status: true,
        });
        if (totalReservations >= exposition.maxVisitor) {
            throw new Error("Exposition is full");
        }
        const alreadyReserved = await this.reservationRepository.findOne({
            visitorId,
            expositionId
        });
        if (alreadyReserved) {
            throw new Error("Visitor already Reserved");
        }
        const newReservation = new Reservation({
            visitorId,
            expositionId,
            status: true
        })
        return await this.reservationRepository.save(newReservation);
    }
}

export default ReservationAdd;