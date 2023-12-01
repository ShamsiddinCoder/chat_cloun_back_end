const {fetchOne} = require('../../../db/db');
const {SEND_M} = require('./SendFmessage');

module.exports.sendMessage = async (from, to) => {
    return await fetchOne(SEND_M, from, to);
}