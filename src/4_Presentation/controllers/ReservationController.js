import ReservationAdd from "../../2_Application/usecases/Reservation/Reservation.Add.usecase.js";
import ReservationRepository from "../../3_InfraStructure/Repositories/Reservation.Repository.js";
import ExpositionRepository from "../../3_InfraStructure/Repositories/Exposition.Repository.js";


const repoReservation = new ReservationRepository();
const repoExposition = new ExpositionRepository();

const reservationAdd = new ReservationAdd(repoReservation, repoExposition);




const add = async (req, res) => {
    try {
        const { expositionId } = req.body;
        const visitorId = req.user.id;
        console.log(req.user.id);
        const reservation = await reservationAdd.execute({ expositionId, visitorId });
        res.status(201).json(reservation);

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

export default {
    add
};