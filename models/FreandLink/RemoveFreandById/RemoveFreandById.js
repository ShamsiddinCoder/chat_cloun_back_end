module.exports.REMOVE_FREAND_BY_ID = `DELETE FROM freands WHERE freands.user_id = $1 and freands.freand_id = $2`;