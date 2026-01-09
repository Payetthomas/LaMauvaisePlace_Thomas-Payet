const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Wrong JWT token' });
        const user = await User.findOne({ where: { token } });
        if(!user) return res.status(403).json({ message: 'Session expired' });
        req.user = user;

        next();
    })
};

const checkRoles = (role) => {
    return (req, res, next) => {
        if (!req.user) return res.status(500).json({ message: 'Auth middleware missing' });

        if (req.user.role === role) {
            return res.status(403).json({ message: `Access denied, only reserved for ${role}` });
        };
        next();
    }
};


module.exports = {
    validateAuth,
    checkRoles
}