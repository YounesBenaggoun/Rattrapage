
import RecommendationConfigModel from "../database/models/RecommendationConfig.model.js";
// import IRecommendationConfigRepository from "../../domain/repositories/IRecommendationConfigRepository.js";


export default class RecommendationConfigRepository  {

  async get() {
    let config = await RecommendationConfigModel.findOne().lean();

    if (!config) {
      config = await RecommendationConfigModel.create({});
      config = config.toObject();
    }

    return config;
  }

  async update(data) {
    const config = await RecommendationConfigModel.findOneAndUpdate(
      {},
      { $set: data },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    ).lean();

    return config;
  }
}