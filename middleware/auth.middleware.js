const jwt = require('jsonwebtoken');
const {secret} = require('../Config');

module.exports = (req, res, next) => {
    if(req.method === 'OPTION'){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(400).json({message: 'Auth error'});
        }else {
            const decoded = jwt.verify(token, secret);
            req.user = decoded;
            next();
        }
    } catch (error) {
        return res.status(400).json({message: 'Auth error'});
    }
}