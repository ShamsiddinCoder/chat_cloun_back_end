const {fetch} = require('../../../db/db');
const {SELECT_FREANDS} = require('./SelectFreands');

module.exports.selectFreands = async (id) => {
    return await fetch(SELECT_FREANDS, id);
}