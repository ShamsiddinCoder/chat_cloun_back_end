const {fetch} = require('../../db/db');

module.exports.getUserByIdWithOutpass = async (id) => {
    // console.log(id);
    return await fetch(`SELECT id, name, avatar, auth FROM users WHERE id IN (${id})`);
}