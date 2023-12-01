const {fetchOne} = require('../../../db/db');
const {SEND_MESSAGE} = require('./SendMessage');

module.exports.sendMessages = async (from, to_id, message) => {
    return await fetchOne(SEND_MESSAGE, from, to_id, message);
}