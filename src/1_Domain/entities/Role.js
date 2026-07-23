 const Role = Object.freeze({
    ORGANIZER: "organizer",
    EXPOSER: "exposer",
    VISITOR: "visitor",
});

const ALL_ROLES = Object.values(Role);

export function isValidRole(role) {
    return ALL_ROLES.includes(role);
}

export default Role;
