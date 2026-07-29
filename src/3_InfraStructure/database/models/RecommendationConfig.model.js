import mongoose from "mongoose";

const recommendationConfigSchema = new mongoose.Schema(
  {
    preferenceCoef: {
      type: Number,
      required: true,
      default: 40,
      min: 0,
    },

    distancePenalty: {
      type: Number,
      required: true,
      default: 0.05,
      min: 0,
    },

    durationCoef: {
      type: Number,
      required: true,
      default: 20,
      min: 0,
    },

    crowdPenalty: {
      type: Number,
      required: true,
      default: 0.4,
      min: 0,
    },

    availableSlotsCoef: {
      type: Number,
      required: true,
      default: 2,
      min: 0,
    },

    maxDistance: {
      type: Number,
      required: true,
      default: 40,
      min: 0,
    },

    bonusLowCrowdTrigger: {
      type: Number,
      required: true,
      default: 30,
      min: 0,
    },

    bonusNearTrigger: {
      type: Number,
      required: true,
      default: 15,
      min: 0,
    },

    bonusNear: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },

    bonusLowCrowd: {
      type: Number,
      required: true,
      default: 15,
      min: 0,
    },

    // key = expositionId, value = priority
    businessPriority: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: "recommendation_configs",
  }
);

export default mongoose.model(
  "RecommendationConfig",
  recommendationConfigSchema
);