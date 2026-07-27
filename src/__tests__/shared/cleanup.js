import { afterAll, beforeAll } from "vitest";
import UserModel from "../../3_InfraStructure/database/models/user.model.js";
import ThemeModel from "../../3_InfraStructure/database/models/Theme.model.js";


import { authData } from "./auth.data.js";




afterAll(async () => {
    // await ThemeModel.deleteMany({});
    await UserModel.findByIdAndDelete(authData.organizerId);
    await UserModel.findByIdAndDelete(authData.exposerId);
    await UserModel.findByIdAndDelete(authData.visitorId);
});