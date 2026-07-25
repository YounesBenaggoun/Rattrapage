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
export const THEME = {
    "name" : "voiture image",
    "description" : "des photo de voiture et moteurs"
}
export const EXPOSITION = {
    "title" : "exposition Test a chatelet",
    "address" : "4 Rue des Innocents. 75001 Paris. France",
    "description" : "exposition d'image",
    "maxVisitor" : 3,
    "duration" : 60,
    "maxExposer" : 5,
    "startDate": "2027-01-01",
    "endDate" : "2027-02-02",
    "theme" : null

}

