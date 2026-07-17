import mongoose from "mongoose";

const themeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const ThemeModel = mongoose.model("Theme", themeSchema);
export default ThemeModel;