const {fetch} = require('../../../db/db');
const {GET_MESSAGE} = require('./SelectFmessage');

module.exports.getFreandMessage = async (id) => {
    return await fetch(GET_MESSAGE, id);
}