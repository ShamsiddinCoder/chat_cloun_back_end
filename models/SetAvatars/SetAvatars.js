module.exports.SET_AVATARS = `INSERT INTO user_avatars(u_id, avatars, position, width, height, size, date, time) 
                                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;