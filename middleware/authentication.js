const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authenticaion error');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Other approch
        const user = await User.findById(payload.userId).select('-password');

        req.user = {
            userId: payload.userId,
            name: payload.name
        }

        // req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authenticaion error by jwt');
    }
}

module.exports = auth; 