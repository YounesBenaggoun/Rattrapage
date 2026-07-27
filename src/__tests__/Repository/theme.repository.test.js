import { describe, expect, afterAll } from "vitest";
import mongoose from "mongoose";


import ThemeRepository from "../../3_InfraStructure/Repositories/Theme.Repository";
import ThemeModel from "../../3_InfraStructure/database/models/Theme.model";

const themeRepository = new ThemeRepository();
let themeId;

const THEME_NAME = "Theme Test";
const UPDATED_THEME_NAME = "Theme Updated";

const newTheme = {
    "name": THEME_NAME,
    "description": "ThemeTest Description"

}

afterAll(async () => {
    await ThemeModel.findByIdAndDelete(themeId);
});


describe.sequential("Test Theme Repository", () => {
    it("Theme Create", async () => {
        const res = await themeRepository.create(newTheme);
        themeId = res.id;
        expect(res.name).toBe(THEME_NAME);
    });
    it("Prevent Duplicate Theme Create", async () => {
        await expect(
            themeRepository.create(newTheme)
        ).rejects.toThrow();

        await expect(
            themeRepository.create(newTheme)
        ).rejects.toMatchObject({
            code: 11000
        });

    });
    test("Theme Updated", async () => {
        const res = await themeRepository.update(themeId,
            {
                "name": UPDATED_THEME_NAME,
                "description": "younes Description"
            });
        expect(res.name).toBe(UPDATED_THEME_NAME);
    });
    test("Theme getAll", async () => {
        const res = await themeRepository.getAll();
        expect(res.length).toBeGreaterThan(0);
    });
    
    test("Theme Delete", async () => {
        const result = await themeRepository.delete(themeId);
        expect(result.id).toBe(themeId);
    });
    test("should return null if theme does not exist", async () => {
        const id = new mongoose.Types.ObjectId();
        const result = await themeRepository.delete(id);
        expect(result).toBeNull();

    });
});