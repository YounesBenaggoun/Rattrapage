import mongoose from "mongoose";


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
        return ids.length === new Set(ids.map(id => id?.toString())).size;
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
  {
    timestamps: true,
    toJSON: { virtuals: true, transform },
    toObject: { virtuals: true, transform },
  }
);
function transform(doc, ret) {
  ret._id = ret._id?.toString();

  if (ret.theme) {
    ret.theme = ret.theme?.toString();
  }

  if (Array.isArray(ret.exposerIds)) {
    ret.exposerIds = ret.exposerIds.map(id => id?.toString());
  }

  return ret;
}

const ExpositionModel = mongoose.model("Exposition", expositionSchema);

export default ExpositionModel;