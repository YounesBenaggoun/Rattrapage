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
  exposerIds: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    validate: {
      validator: function (ids) {
        return ids.length === new Set(ids.map(id => id.toString())).size;
      },
      message: "Duplicate exposerIds are not allowed",
    },
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