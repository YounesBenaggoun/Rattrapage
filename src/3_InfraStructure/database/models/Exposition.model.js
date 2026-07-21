import mongoose from "mongoose";

const THEMES = ['action', 'horror', 'history'];

const expositionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  theme:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
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

  duration: {
    type: Number,
    required: true,
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

const ExpositionModel = mongoose.model("Exposition", expositionSchema);

export default ExpositionModel;