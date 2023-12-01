const {fetchOne} = require('../../db/db');
const {POST_NEW_USER} = require('./NewUserRegister');

module.exports.addNewUser = async (name, password) => {
    return fetchOne(POST_NEW_USER, name, password);
}