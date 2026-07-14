class IReservation{
    constructor(){}
    async countReservationByExposition({_expositionId, _status}){
        throw new Error("countReservationByExposition must be implemented");
    }
    async findOne({_visitorId, _expositionId}){
        throw new Error ("Reservation.FindByOne must be implemented")
    }
    async save(reservation){
        throw new Error("Reservation.save must be implemented");
    }
}

export default IReservation;