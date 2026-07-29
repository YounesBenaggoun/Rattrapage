
import RecommendationConfigModel from "../database/models/RecommendationConfig.model.js";
import IRecommendationConfigRepository from "../../1_Domain/interface/RecommendationConfig.interface.js";


export default class RecommendationConfigRepository extends IRecommendationConfigRepository{

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
        returnDocument: "after",
        runValidators: true,
      }
    ).lean();

    return config;
  }
}