const { sendMessages } = require("../models/Messages/SendMessage/index");
const { getMessages } = require("../models/Messages/GetMessage/index");
const { removeMessages } = require("../models/Messages/RemoveMessage/index");
const {getUserNoPass} = require('../models/GetsUserNoPass/index');


class MessageController {
    async sendingMessage (req, res){
        try {
            const userId = req.user.id;
            const userName = req.user.name;
            const {id} = req.params;
            const {messag} = req.body;
            
            const message = await sendMessages(userId, id, messag, userName);
            res.json(message);

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error sending message!'});
        }
    }

    async getingMessages(userId, userName, userAvatar, id, fName, fAvatar){
        try {
            
            const getMessage = await getMessages(userId, id);
            const message = getMessage?.map(items => {
                return {
                    id: items.id,
                    from: {
                        from_id: items.from_id,
                        userName,
                        userAvatar: userAvatar ? userAvatar : null
                    },
                    to: {
                        to_id: items.to_id,
                        fName,
                        fAvatar
                    },
                    message: items.message
                }

                // if(items.from_id === +userId){
                    
                // }else {
                //     return {
                //         id: items.id,
                //         from_id: items.from_id,
                //         to_id: items.to_id,
                //         message: items.message
                //     }
                // }
            })
            return message ? message : [];
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async removeMessagess(req, res){
        try {
            const {id} = req.query;
            const remove = await removeMessages(id);
            res.json(remove);

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error remove message'});
        }
    }
}

module.exports = new MessageController();