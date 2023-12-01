const Routers = require('express');
const router = Routers();
const Controller = require('../controller/Controller');
const MessageController = require('../controller/MessageController');
const authMiddleWare = require('../middleware/auth.middleware');

router.post('/register', Controller.registration);
router.post('/login', Controller.login);
router.post('/logout', authMiddleWare, Controller.logOut);
router.post('/avatar', authMiddleWare, Controller.uploadFileAvatar);
router.post('/freand/:id', authMiddleWare, Controller.freandLink);
router.post('/message/:id', authMiddleWare, MessageController.sendingMessage);
router.put('/update', authMiddleWare, Controller.updateUser);
router.post('/find', authMiddleWare, Controller.findFreands);
router.delete('/removefreand/:id', authMiddleWare, Controller.removeFreand);
router.delete('/message/', authMiddleWare, MessageController.removeMessagess);
router.delete('/avatar', authMiddleWare, Controller.deleteFileAvatar);
router.get('/freand/:id', authMiddleWare, Controller.getFreands);
router.get('/auth', authMiddleWare, Controller.auth);

module.exports = router;