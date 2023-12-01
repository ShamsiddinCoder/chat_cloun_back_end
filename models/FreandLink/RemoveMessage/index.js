const {fetch} = require('../../../db/db');
const {REMOVE_MESSAGE} = require('./RemoveMessage');

module.exports.removeMessage = async (userId, id) => {
    return await fetch(REMOVE_MESSAGE, userId, id);
}