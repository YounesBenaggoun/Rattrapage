import mongoose from "mongoose";

const expositionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
  },
  theme: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  maxVisitor: {
    type: Number,
    required: true,
    min: 1,
  },
  maxExposer: {
    type: Number,
    required: true,
    min: 1,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startDate;
      },
      message: "endDate doit être supérieur à startDate",
    },
  },
}, 
{ timestamps: true }
);

const Exposition = mongoose.model("Exposition", expositionSchema);

export default Exposition;