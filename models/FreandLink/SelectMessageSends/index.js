const {fetch} = require('../../../db/db');
const {GET_M_SENDS} = require('./SelectMessageSends');

module.exports.getMessageSends = async (userId) => {
    return await fetch(GET_M_SENDS, userId)
}