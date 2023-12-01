const {fetch} = require('../../db/db');
const {FINE_FREANDS} = require('./FineFreands');

module.exports.findFreands = async (name) => {
    return await fetch(`select id, name, avatar, auth from users where name ilike '${name}%'`);
}