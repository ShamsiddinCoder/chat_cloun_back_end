const JWT = require('../middleware/CreateJwt');
const fs = require('fs');

const {addNewUser} = require('../models/RegisterNewUser/index');
const {getUserName} = require('../models/getUserByName/index');
const {getUsers} = require('../models/getUsers/index');
const {getUserById} = require('../models/GetUserById/index');
const {updateUser} = require('../models/UpdateUser/index');
const CheckFunc = require('../models/CheckFreands/CheckFunc/CheckFunc');
const {sendMessage} = require('../models/FreandLink/SendFmessage/index');
const {getFreandMessage} = require('../models/FreandLink/SelectFmessage/index');
const {getUserByIdWithOutpass} = require('../models/GetUserByIdWithoutPass/index');
const { selectFreands } = require('../models/CheckFreands/SelectFreands');
const {sendFreand} = require('../models/FreandLink/SendFreand/index');
const {getUserNoPass} = require('../models/GetsUserNoPass/index');
const { getFreandsById } = require('../models/CheckFreands/GetFreandById');
const {check} = require('../models/CheckFreands/Check/index');
const { removeFreand } = require('../models/RemoveFreands');
const { getMessageSends } = require('../models/FreandLink/SelectMessageSends');
const { removeMessage } = require('../models/FreandLink/RemoveMessage');
const { removeFreandById } = require('../models/FreandLink/RemoveFreandById');
const MessageController = require('./MessageController');
const FileService = require('./CreateDir');
const {findFreands} = require('../models/FineFreands/index');
const {newAvatars} = require('../models/SetAvatars/index');
const {getAllAvatars} = require('../models/GetAllAvatars/index');
const {removeAvatar} = require('../models/RemoveAvatar/index');

class Controller {
    async registration(req, res){
        try {
            const {name, password} = req.body;
            const allUsers = await getUsers();
            const checkUser = allUsers.some(file => file.name === name);
            if(checkUser){
                res.status(400).json({message: 'Like thi user already have'});
            }else {
                const newUser = await addNewUser(name, password);
                res.status(200).json({message: 'Register ok'});
                await FileService.createDir(req.filePath, newUser.id);
                // res.json(newUser);
            }
        } catch (error) {
            res.status(400).json({message: 'Regirtration error'});
        }
    }

    async getFreands(req, res){
        try {
            const userId = req.user.id;
            const userName = req.user.name;
            const userAvatar = req.user.avatar;
            const {id} = req.params;
            const userFreands = await getUserNoPass(id);
            const freands = await CheckFunc(id);
            const messages  = await MessageController.getingMessages(userId, userName, userAvatar, id, userFreands[0].name, userFreands[0].avatar);
            const allAvatars = await getAllAvatars(id);
            
            res.json({...userFreands[0], freands, messages, avatars: allAvatars ? allAvatars : []});
        } catch (error) {
            res.status(400).json({message: 'User is not found'});
        }
    }

    async login(req, res){
        try {
            const {name, password} = req.body;
            const allUsers = await getUsers();
            const checkUser = allUsers.some(file => file.name === name);
            
            if(!checkUser){
                res.status(400).json({message: 'Like this user not found'});
            }else {
                const userRegister = await getUserName(name, password);
                const token = JWT(userRegister.id, userRegister.name, userRegister.password, userRegister.avatar);
                
                if(token){
                    const user = await getUserById(userRegister.id);
                    
                    await updateUser(user.name, user.avatar, true, user.password, user.id);
                   
                }

                return res.json({
                    token,
                    user: {
                        id: userRegister.id,
                        name: userRegister.name,
                    }
                });
            }
           
        } catch (error) {
            res.status(400).json({message: 'Login error'});
        }
    }

    async logOut(req, res){
        try {
            const userId = req.user.id;
            const user = await getUserById(userId);
            const updates = await updateUser(user.name, user.avatar, false, user.password, userId);
            
            return res.json({
                token: null,
                user: null
            });
        } catch (error) {
            res.status(400).json({message: 'Login error'});
        }
    }

    async auth(req, res){
        try {
            const userId = req.user.id;
            const {id} = req.body;
            const freands = await CheckFunc(userId);
            const user = await getUserById(userId);
            const f_message = await getFreandMessage(userId);
            const sub = f_message.map(elem => elem.m_from);
            const sub_message = await getUserByIdWithOutpass(sub);
            const allAvatars = await getAllAvatars(userId);
            
            return res.json({
                ...user, 
                freands: freands.name === 'error' || freands.length <= 0 || freands === null || freands === undefined ? [] : freands,
                sub_message: sub_message === null || sub_message.length <= 0 || sub_message.name === 'error' ? [] : sub_message,
                allAvatars: allAvatars ? allAvatars : []
            });

        } catch (error) {
            res.status(400).json({message: 'Error auth'});
        }
    }

    async updateUser(req, res){
        try {
            const userId = req.user.id;
            const {name, password, avatar} = req.body;
            const user = await getUserById(userId);

            const date = {
                name: name || user.name,
                password: password || user.password,
                avatar: avatar || user.avatar,
            }
            const updates = await updateUser(date.name, date.avatar, true, date.password, userId);
            res.status(200);

        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error update user!'});
        }
    }

    async uploadFileAvatar(req, res){
        try {
            
            const file = req.files.avatar;
            const user = req.user;
            const body = JSON.parse(req.body.inform);
            const dateNow = JSON.parse(req.body.dateNow);
            const userById = await getUserById(user.id);
            const path = `${req.filePath}\\${userById.id}\\${file.name}`;
            
            if(fs.existsSync(path)){
                res.status(400).json({message: 'File already exist!'});
            }
            
            const date = {
                name: userById.name,
                password: userById.password,
                avatar: file.name,
                auth: userById.auth,
                position: body.position,
                width: body.width,
                height: body.height,
                size: file.size,
                date: dateNow.dateNow,
                time: dateNow.timeNow
            }
            
            const uploaded = await updateUser(date.name, date.avatar, date.auth, date.password, user.id);
            await newAvatars(user.id, date.avatar, date.position, date.width, date.height, date.size, date.date, date.time);

            file.mv(path);
            res.json(uploaded);

        } catch (error) {
            
        }
    }

    async deleteFileAvatar(req, res){
        try {
            const user = req.user;
            const userById = await getUserById(user.id);
            const {id, u_id, avatars} = req.body;
            
            if(avatars){
                if(userById.avatar === avatars){
                    res.status(402);
                }else {
                    await removeAvatar(id, u_id);
                    const path = `${req.filePath}\\${user.id}\\${avatars}`;
                    fs.unlinkSync(path);
                }
            }else {
                if(!userById.avatar){
                    res.json({message: 'File wase deleted'});
                }
                if(userById.avatar){
                    const uploaded = await updateUser(userById.name, null, userById.auth, userById.password, user.id);
                    res.json(uploaded);
                }
            }

        } catch (error) {
            
        }
    }

    async freandLink(req, res){
        try {
            const userId = req.user.id;
            const {id} = req.params;
            const f_message = await getFreandMessage(userId);
            const getMSends = await getMessageSends(userId);
            const getMeFromFrenads = await getFreandsById(userId, id);
            const getFreands = await check(id, userId);

            const b = f_message.some(itm => itm.m_from === +id && itm.m_to === +userId);
            const d = getMSends.some(itm => itm.m_from === +userId && itm.m_to === +id);
            
            if(getMeFromFrenads.length === 0 && b){
                await sendFreand(userId, id);
                await removeMessage(userId, id);
                return res.status(200).json({message: 'Yoare  subscribed'});
            }

            if(b || d){
                return res.status(400).json({message: 'Like this message alredy sent'});
            }else  {
                if(getMeFromFrenads.length > 0 || getFreands.length > 0){
                    return res.status(200).json({message: 'You already subscribed'});
                }else {
                    await sendFreand(userId, id);
                    await sendMessage(userId, id);
                    return res.status(200).json({message: 'You sent message for subscrib'});
                }                
            }

        } catch (error) {
            console.log(error);
        }
    }

    async removeFreand(req, res){
        try {
            const userId = req.user.id;
            const {id} = req.params;
            
            const getFreands = await selectFreands(userId);
            const getFreandRemove = await check(id, userId);

            if(getFreands.length === 0 && getFreandRemove.length === 0){
                res.status(200).json({message: 'User not found'});
            }else {
                if(getFreandRemove.length > 0 && getFreands.length === 0){
                    await removeMessage(userId, id);
                    await removeFreandById(userId, id);
                    res.status(200).json({message: 'Subscrib cenceled'});
                }else if(getFreandRemove.length === 0 && getFreands.length > 0){
                    await removeMessage(id, userId);
                    await removeFreandById(id, userId);
                    res.status(200).json({message: 'Subscrib cenceled'});
                }else if(getFreands.length > 0 && getFreandRemove.length > 0){
                    const userIdFromFreands = Array(getFreands[0].user_id, getFreandRemove[0].user_id);    
                    const freandIdFromFreands = Array(getFreands[0].freand_id, getFreandRemove[0].freand_id); 

                    await removeFreand(userIdFromFreands, freandIdFromFreands);
                    res.status(200).json({message: 'User removed'});
                }
            }

            
        } catch (error) {
            console.log(error);
            res.status(400).json({message: 'Error remove freands'});
        }
    }

    async findFreands(req, res){
        try {
            const {name} = req.body;
            const findFreand = await findFreands(name);
            res.json(findFreand);
            
        } catch (error) {
            res.status(400).json({message: 'Fine freands errors'});
        }
    }
}

module.exports = new Controller();