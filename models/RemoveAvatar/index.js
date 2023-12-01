const {fetch} = require('../../db/db');
const {REMOVE_AVATAR} = require('./RemoveAvatar');

module.exports.removeAvatar = async (id, u_id) => {
    return await fetch(REMOVE_AVATAR, id, u_id);
}