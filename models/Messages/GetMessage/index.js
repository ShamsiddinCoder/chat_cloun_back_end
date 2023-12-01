const {fetch} = require('../../../db/db');
const {GETMESSAGE} = require('./GetMessage');

module.exports.getMessages = async (form_id, to_id) => {
    return await fetch(GETMESSAGE, form_id, to_id);
}