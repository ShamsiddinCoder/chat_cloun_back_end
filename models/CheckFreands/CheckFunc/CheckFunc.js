const {getFreands} = require('../GetFreands/index');
const {selectFreands} = require('../SelectFreands/index');
const {check} = require('../Check/index');

async function CheckFunc(userId){
    try {
        const a = await selectFreands(userId);
        const b = a?.map(items => items.freand_id);
        
        const c = b.length !== 0 ? await check(b, userId) : [];
        const users_freand_id = c?.map(itm => itm.user_id);
        const freands = users_freand_id.length !== 0 ? await getFreands(userId, users_freand_id) : {message: 'Freands not found'};
        
        return freands;
        // const checkFreand = b.filter((elem, index) => users_freand_id[index] !== elem);
    } catch (error) {
        console.log('Error check');
    }
}

module.exports = CheckFunc;