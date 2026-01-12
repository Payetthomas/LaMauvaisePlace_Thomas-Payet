const jwt = require('jsonwebtoken');
const { User, Annonce } = require('../models');

const validateAuth = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if(!headerToken) return res.status(401).json({ message: 'No token provided' });

    // Ajout d'un split pour envoyer le token sans la chaine de charactere: "Bearer", reçu avec req.headers['authorization']
    const token = headerToken.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token format is invalid' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err) return res.status(403).json({ message: 'Wrong JWT token' });
        const user = await User.findOne({ where: { token } });
        if(!user) return res.status(403).json({ message: 'Session expired' });
        req.user = user;

        next();
    })
};

const checkRoles = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user;

        if (!req.user) return res.status(500).json({ message: 'Auth middleware missing' });

        const hasRole = user.role === requiredRole || user.role === 'admin';

        if (!hasRole) {
            return res.status(403).json({ message: `Access denied, only reserved for ${role}` });
        };

        next();
    }
};

const manageAnnonce = async (req, res, next) => {

    try {
        const user = req.user;
        const id = req.params.id; 

        const annonce = await Annonce.findByPk(id);

        if (!annonce) {
            return res.status(404).json({ message: "Annonce not found" });
        }

        if (user.role === 'admin' || annonce.user_id === user.id) {
            req.annonce = annonce;
            return next();
        }

        return res.status(403).json({ 
            message: "Denied access" 
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Error", 
            error: error.message 
        });
    }
};


module.exports = {
    validateAuth,
    checkRoles, 
    manageAnnonce
}