const {fetchOne} = require('../../db/db');
const {GET_USER_NAME} = require('./GetUserByName');

module.exports.getUserName = async (name, password) => {
    return await fetchOne(GET_USER_NAME, name, password);
}