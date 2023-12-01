module.exports.GETMESSAGE = `SELECT * FROM messages WHERE messages.from_id = $1 and messages.to_id = $2
                            or messages.from_id = $2 and messages.to_id = $1`;