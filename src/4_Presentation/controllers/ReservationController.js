

import Exposition from "../../3_InfraStructure/database/models/Exposition.model.js";
import Reservation from "../../3_InfraStructure/database/models/Reservation.model.js";
const add = async (req, res) => {
    try {
        console.log(req.user);
        const visitorId = req.user.id;
        const expositionId = "6a55f08287701b676bdc0838";
        const exposition = await Exposition.findById(expositionId);

        if (!exposition) {
            throw new Error("Exposition not found");
        }
        const totalReservations = await Reservation.countDocuments({
            expositionId: expositionId,
            status: "CONFIRMED",
        });
        console.log("total Reservation ", totalReservations);

        if (totalReservations >= exposition.maxVisitors) {
            throw new Error("Exposition is full");
        }

        const alreadyReserved = await Reservation.findOne({
            visitorId: visitorId,
            expositionId: expositionId,
        });

        if (alreadyReserved) {
            throw new Error("Visitor already Reserved");
        }

        const newReservation = Reservation.create({
            visitorId: visitorId,
            expositionId: expositionId,
        });
        res.status(201).json(newReservation);



    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }






}

export default {
    add
};