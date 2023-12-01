const {fetch} = require('../../db/db');
const {DELETE_FREANDS} = require('./RemoveFreands');

module.exports.removeFreand = async (userId, freandId) => {
    return await fetch(`DELETE FROM freands WHERE freands.user_id IN(${userId}) and freands.freand_id IN(${freandId})`);
};