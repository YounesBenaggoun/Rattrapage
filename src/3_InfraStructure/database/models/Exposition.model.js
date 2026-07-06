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
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.startTime;
      },
      message: "endTime doit être supérieur à startTime",
    },
  },
});

const Exposition = mongoose.model("Exposition", expositionSchema);

export default Exposition;