const {fetch} = require('../../../db/db');

module.exports.check = async (check_f_id, userId) => {
    return await fetch(`SELECT * FROM freands WHERE freands.user_id IN (${check_f_id}) and freands.freand_id = ${userId}`);
}