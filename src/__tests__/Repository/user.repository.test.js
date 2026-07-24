import { describe, expect, afterAll } from "vitest";


import UserRepository from "../../3_InfraStructure/Repositories/User.Repository.js";

const newUser = {
    email: "testtest@gmail.com",
    password: "12341234",
    role: "visitor",
    name: "le Name"

}
let userId;

const repository = new UserRepository();




describe.sequential("Test User Repository", () => {

    it("User Create", async () => {
        const res = await repository.save(newUser);
        userId = res.id;
        expect(res.name).toBe(newUser.name);
    });

    it("User findByEmail", async () => {
        const res = await repository.findByEmail(newUser.email);
        expect(res.name).toBe(newUser.name);
        expect(res.id).toBe(userId);

    });

    it("User FindAll", async () => {
        const res = await repository.findAll();
        expect(res.length).toBeGreaterThan(0);
    });

    it("Delete User", async () => {
        const res = await repository.delete(userId);
        userId = res.id;
        expect(res.id).toBe(userId);
    });




});