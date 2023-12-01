const {fetch} = require('../../../db/db');
const {GET_FREANDS} = require('./GetFreands');

module.exports.getFreands = async (userId, users_freand_id) => {
    return await fetch(`select u.id as u_id , users.id, users.name, users.avatar from users as u 
                        left join freands on freands.user_id = u.id 
                        left join users on freands.freand_id = users.id where freands.user_id = ${userId} and freands.freand_id in (${users_freand_id})`);
}