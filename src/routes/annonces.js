const express = require('express');
const { validateAnnoces } = require('../middlewares/annonces');
const { getAllAnnonces, getAnnonce } = require('../services/annonces');
const router = express.Router();

router.get('/', validateAnnoces, getAllAnnonces()
);

router.get('/:id', getAnnonce())

router.post('/', validateAnnoces, (req,res) => {
    res.status(201).json({
        message: "success"
    });
});

module.exports = router;