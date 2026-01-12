const { dbInstance, User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    login,
    register
};
 
async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { username }
            //on peut selectionner les colonnes qu'on souhaite dans notre user de cette façon:
            // attributes: [ 'id', 'firstname', 'lastname', 'username', 'password' ]
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) return res.status(401).json({ message: 'Unauthorized !'});

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        user.token = token;
        user.save();

        return res.status(200).json({
            user,
            token
        });

    } catch(error) {
        return res.status(400).json({
            message: "Authentification failed",
            error
        })
    }
};

async function register(req, res) {
    const transaction = await dbInstance.transaction();

    try {
        const { firstname, lastname, profil_picture, phone_number, address, zip_code, city, username, password } = req.body;

        const salt = parseInt(process.env.SALT);

        const passwordHached = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstname,
            lastname,
            username,
            profil_picture,
            phone_number,
            address,
            zip_code,
            city,
            password: passwordHached
        }, { transaction });

        transaction.commit();

        return res.status(201).json({
            message: "User created success",
            user
        });
        
    } catch (error) {
        transaction.rollback();

        return res.status(400).json({
            message: "User create failed",
            error
        })
    };
};




