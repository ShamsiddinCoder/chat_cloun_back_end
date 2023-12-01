const {fetchOne} = require('../../db/db');
const {UPDATE_USER} = require('./UpdateUser');

module.exports.updateUser = async (name, avatar, auth, password, id) => {
    return await fetchOne(UPDATE_USER, name, avatar, auth, password, id);
}