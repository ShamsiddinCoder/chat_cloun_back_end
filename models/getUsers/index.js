const {fetch} = require('../../db/db');
const {GET_USERS} = require('./GetUsers');

module.exports.getUsers = async () => {
    return await fetch(GET_USERS);
}
