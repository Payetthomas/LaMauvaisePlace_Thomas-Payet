const { User, Annonce, dbInstance } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
    updateUser,
    getMyProfil,
    getMyAnnonces,
    getUsers
};

async function getUsers(req, res) {

    try {
        const users = await User.findAll({
             order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            message: "All users", 
            users
        });
    } catch (error) {
        res.status(500).json({ message: "Error server", error: error.message });
    }
};

async function getMyProfil(req, res) {
    try {
        const user = req.user;

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.status(200).json({
            message: "Mon profil",
            user: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profil_picture: user.profil_picture,
                phone_number: user.phone_number,
                address: user.address,
                zip_code: user.zip_code,
                city: user.city
            }
        });
        
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

async function getMyAnnonces(req, res) {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ message: "User not found" });

        const annonces = await Annonce.findAll({
            where: { user_id:  user.id},
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            count: annonces.length,
            annonces
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

async function updateUser(req, res) {
    const idUser = req.params.id;
    const transaction = await dbInstance.transaction();

    try {
        const findUser = await User.findByPk(idUser);
        if (!findUser) return res.status(404).json({ message: "User not found" });

        const { firstname, lastname, profil_picture, phone_number, address, zip_code, city, username, password } = req.body;

        const updateUser = {
            firstname: firstname || findUser.firstname,
            lastname: lastname || findUser.lastname,
            username: username || findUser.username,
            profil_picture: profil_picture || findUser.profil_picture,
            phone_number: phone_number || findUser.phone_number,
            address: address || findUser.address,
            zip_code: zip_code || findUser.zip_code,
            city: city || findUser.city
        };

        if (password && password.trim() !== "") {
            const salt = parseInt(process.env.SALT);
            updateUser.password = await bcrypt.hash(password, salt);
        }

        await findUser.update(updateUser, { transaction });
        await transaction.commit();

        return res.status(201).json({
            message: "User update success",
            
        });
        
    } catch (error) {
        transaction.rollback();

        return res.status(400).json({
            message: "User update failed",
            error
        })
    };
};

