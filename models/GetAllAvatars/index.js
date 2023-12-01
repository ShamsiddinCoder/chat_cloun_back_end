const {fetch} = require('../../db/db');
const {GETALL_AVATARS} = require('./GetAllAvatars');

module.exports.getAllAvatars = async (id) => {
    return await fetch(GETALL_AVATARS, id);
}