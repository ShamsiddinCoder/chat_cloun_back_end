const {fetchOne} = require('../../db/db');
const {SET_AVATARS} = require('./SetAvatars');

module.exports.newAvatars = async (udId, avatars, position, width, height, size, date, time) => {
    console.log(size);
    return await fetchOne(SET_AVATARS, udId, avatars, position, width, height, size, date, time);
}