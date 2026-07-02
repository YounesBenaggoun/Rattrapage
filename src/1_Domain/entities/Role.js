


const Role = Object.freeze({
    ADMIN: 'admin',
    EXPOSER: 'exposer',
    USER: 'user',
});

const ALL_ROLES = Object.values(Role);

function isValidRole(role) {
    return ALL_ROLES.includes(role);
}

module.exports = { Role, ALL_ROLES, isValidRole };
