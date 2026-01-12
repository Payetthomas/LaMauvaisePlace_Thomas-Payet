const { Annonce, dbInstance, Sequelize } = require('../models');

module.exports = {
    getAllAnnonces,
    getAnnonce,
    createAnnonce,
    editAnnonce,
    deleteAnnonce,
    searchAnnonce,
    getAnnoncesAdmin,
    getAnnoncesBySeller,
    updateStatusAnnonce
}

async function getAllAnnonces(req, res) {

    try {
        const annonces = await Annonce.findAll({
            where : { 
                status: 'published'
             },
             order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            message: "Published annonces", 
            annonces
        });
    } catch (error) {
        res.status(500).json({ message: "Error server", error: error.message });
    }
};

async function getAnnoncesAdmin(req, res) {

    try {
        const annonces = await Annonce.findAll({
             order: [['createdAt', 'DESC']]
        });
        res.status(200).json({
            message: "All annonces", 
            annonces
        });
    } catch (error) {
        res.status(500).json({ message: "Error server", error: error.message });
    }
};


async function getAnnonce(req, res) {

    const id = req.params.id; 

    try {
        //la requete peut se faire aussi avec findOne()
        //const annonce = await Annonce.findOne({
        //      where: { id }
        //});
        //requete plus "lourd" 

        const annonce = await Annonce.findByPk(id);

        res.status(200).json({
            message: "Mon annonce par ID",
            annonce
        });
    } catch (error) {
        console.log(error)
    }
};

async function createAnnonce(req, res) {

    const transaction = await dbInstance.transaction();

    try {
        const { title, description, price, filepath, status } = req.body; 

        const annonce = await Annonce.create({
            title, description, price, filepath, status 
        }, { transaction });

        await transaction.commit();

        return res.status(201).json({
            status: "Annonce created success",
            annonce
        })
    } catch (error) {
        await transaction.rollback();

        return res.status(400).json({
            status: "Annonce not create"
        })
    }

};

async function editAnnonce(req, res) {
    const id = req.params.id;
    const transaction = await dbInstance.transaction();

    try {
        const { title, description, price, filepath, status } = req.annonce;

        const annonce = await Annonce.update({
            title,
            description,
            price,
            filepath,
            status
        }, {
            where: { id },
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            status: "Annonce updated success",
            annonce
        });

    } catch (error) {
        await transaction.rollback();

        return res.status(400).json({
            status: "Annonce not updated"
        });
    }
};

async function updateStatusAnnonce(req, res) {
    const transaction = await dbInstance.transaction();

    try {
        const id = req.params.id;
        const { status, status_comment } = req.body;

        const annonce = await Annonce.findByPk(id);

        if (!status) {
            return res.status(400).json({ message: "Not status" });
        };

        await annonce.update({ status, status_comment }, { transaction });

        await transaction.commit();

        return res.status(200).json({
            message: `Annonce status: ${status}`,
            annonce
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        return res.status(400).json({
            message: "Error update status",
            error: error.message
        });
    }
};

async function deleteAnnonce(req,res) {
    
    const annonce = req.annonce;
    const transaction = await dbInstance.transaction();

    try {
        await annonce.destroy({ transaction });

        await transaction.commit();

        return res.status(200).json({
            status: "Annonce delete success"
        });

    } catch (error) {
        await transaction.rollback();

        return res.status(400).json({
            status: "Annonce delete failed",
            error
        });
    }
}; 

 async function searchAnnonce(req, res) {
    const search_key = req.query.search;

    try {
        
        const conditions = (search_key) ? {
            where: {
                title: {
                    [Op.like]: '%'+ search_key +'%'
                }
            }
        } : {};

        const annonces = await Annonce.findAll(conditions);

        res.status(200).json(annonces);
    }
    catch (error) {
        return res.status(400).json({
            status: "Search failed",
            error
        });
    }     
};

async function getAnnoncesBySeller(req, res) {

    const id = req.params.id

    try {
        const annonces = await Annonce.findAll({
            where: {
                user_id: id
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: `Annonces de l'annonceur ${id}`,
            count: annonces.length,
            annonces
        });

    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur lors de la récupération des annonces", 
            error: error.message 
        });
    }
}

