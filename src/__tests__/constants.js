import Role from "../1_Domain/entities/Role.js";


export const PASSWORD = "12341234";

export const USERS = {
    organizer: {
        email: "organizerTest@gmail.com",
        password: PASSWORD,
        name: "Organizer Ben",
        role: Role.ORGANIZER
    },
    exposer: {
        email: "exposerTest@gmail.com",
        password: PASSWORD,
        name: "Exposer Ben",
        role: Role.EXPOSER
    },
    visitor: {
        email: "visitorTest@gmail.com",
        password: PASSWORD,
        name: "Visitor Ben",
        role: Role.VISITOR
    }
};