const { Annonce, dbInstance } = require('../models');

module.exports = {
    getAllAnnonces,
    getAnnonce,
    editAnnonce,
    deleteAnnonce,
    searchAnnonce
}

async function getAllAnnonces(req, res) {

    try {
        const annonces = await Annonce.findAll();
        res.status(200).json({
            message: "Mes annonces", 
            annonces
        });
    } catch (error) {
        
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

        transaction.commit();

        return res.status(201).json({
            status: "Annonce created success",
            annonce
        })
    } catch (error) {
        transaction.rollback();

        return res.status(400).json({
            status: "Annonce not create"
        })
    }

};

async function editAnnonce(req, res) {
    const transaction = await dbInstance.transaction();

    try {
        const { title, description, price, filepath, status } = req.body;

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

        transaction.commit();

        return res.status(200).json({
            status: "Annonce updated success",
            annonce
        });

    } catch (error) {
        transaction.rollback();

        return res.status(400).json({
            status: "Annonce not updated"
        });
    }
};

async function deleteAnnonce(req,res) {
    
    const transaction = await dbInstance.transaction();

    try {
        const { id } = req.params;
        const annonce = await Annonce.destroy({
            where: { id },
            transaction
        });

        transaction.commit();

        return res.status(200).json({
            status: "Annonce delete success"
        });

    } catch (error) {
        transaction.rollback();

        return res.status(400).json({
            status: "Annonce delete failed",
            error
        });
    }
}; 

const searchAnnonce = async (req, res) => {
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

