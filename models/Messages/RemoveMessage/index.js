const {fetchOne} = require('../../../db/db');
const {REMOVE_MESSAGE} = require('./RemoveMessage');

module.exports.removeMessages = async (id) => {
    return await fetchOne(REMOVE_MESSAGE, id);
}