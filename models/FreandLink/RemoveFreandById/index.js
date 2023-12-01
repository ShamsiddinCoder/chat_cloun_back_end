const {fetch} = require('../../../db/db');
const {REMOVE_FREAND_BY_ID} = require('./RemoveFreandById');

module.exports.removeFreandById = async (userId, id) => {
    return await fetch(REMOVE_FREAND_BY_ID, id, userId);
}