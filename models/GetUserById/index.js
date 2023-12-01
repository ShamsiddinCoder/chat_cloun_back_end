const {fetchOne} = require('../../db/db');
const {GET_USER_BY_ID} = require('./GetUserById');

module.exports.getUserById = async (id) => {
    return await fetchOne(GET_USER_BY_ID, id);
}