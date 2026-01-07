const { dbInstance, User } = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    login,
    register
};

const emailFictif = "thomas@example.com";
const mdpFictif = "azerty";
 
function login(req, res) {
    const {email, password} = req.body;

    if(email != emailFictif){
        return res.status(404).json({ message: "Email ou mot de passe incorrect" });
    }; 

    if(password != mdpFictif) {
        return res.status(404).json({ message: "Email ou mot de passe incorrect" });
    };

    res.status(200).json({
        message: "Vous etes connecté !"
    });

};

async function register(req, res) {
    const transaction = await dbInstance.transaction();

    try {
        const { firstname, lastname, profil_picture, phone_number, address, zip_code, city, username, password } = req.body;

        const passwordHached = await bcrypt.hash(password, )
        
    } catch (error) {
        
    }


}