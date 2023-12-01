const {fetch} = require('../../db/db');
const {GETUSER_NO_PASS} = require('./GetsUserNoPass');

module.exports.getUserNoPass = async (id) => {
    return await fetch(GETUSER_NO_PASS, id);
}