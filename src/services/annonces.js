module.exports = {
    getAllAnnonces,
    getAnnonce,
    editAnnonce,
    deleteAnnonce
}

function getAllAnnonces(req, res) {
    res.status(200).json({
        message: "Mes annonces"
    });
};

function getAnnonce(req, res) {
    res.status(200).json({
        message: "Mon annonce"
    });
};

function editAnnonce(req, res) {
    res.status(200).json({
        message: "Annonce MAJ",
        id: req.params.id
    });
};

function deleteAnnonce(req,res) {
    res.status(204).json({
        message: "Annonce suppr",
        id: req.params.id
    });
}
