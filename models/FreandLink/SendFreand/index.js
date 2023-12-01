const {fetchOne} = require('../../../db/db');
const {SEND_FREAND} = require('./SendFreand');

module.exports.sendFreand = async (userId, id) => {
    return await fetchOne(SEND_FREAND, userId, id);
}