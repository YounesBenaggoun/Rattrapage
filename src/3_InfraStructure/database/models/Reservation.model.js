import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        visitorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        expositionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exposition",
            required: true,
        },

        status: {
            type: Boolean,
            default: true
        },
    },
    { timestamps: true }
);

reservationSchema.index(
    {
        visitorId: 1,
        expositionId: 1,
    },
    {
        unique: true,
    },
);

export default mongoose.model("Reservation", reservationSchema);