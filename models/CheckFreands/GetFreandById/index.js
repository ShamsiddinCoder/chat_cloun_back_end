const {fetch} = require('../../../db/db');
const {GET_FREANDS_BY_ID} = require('./GetFreandById');

module.exports.getFreandsById = async (userId, id) => {
    return await fetch(GET_FREANDS_BY_ID, userId, id);
}