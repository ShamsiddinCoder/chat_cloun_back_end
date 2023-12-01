const jwt = require('jsonwebtoken');
const {secret} = require('../Config');

const createJwt = (id, name, password) => {
    const payload = {
        id, name, password
    }

    return jwt.sign(payload, secret, {expiresIn: '2h'});
}

module.exports = createJwt;