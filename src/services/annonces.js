module.exports = {
    getAllAnnonces,
    getAnnonce
}

function getAllAnnonces(req, res) {
    res.status(200).json({
        message: "Mes annonces"
    });
}

function getAnnonce(req, res) {
    res.status(200).json({
        message: "Mon annonce"
    });
}