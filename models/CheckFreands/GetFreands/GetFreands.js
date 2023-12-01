module.exports.GET_FREANDS = `select u.id as u_id , users.id, users.name, users.avatar from users as u 
                                left join freands on freands.user_id = u.id 
                                left join users on freands.freand_id = users.id where freands.user_id = $1 and freands.freand_id = $2`;