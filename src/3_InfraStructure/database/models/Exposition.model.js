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
    type: ["string"],
    // enum: THEMES,
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length > 0;
      },
      message: 'An exposition must have at least one theme.'
    }
  }
  ,
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