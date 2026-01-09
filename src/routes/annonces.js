const express = require('express');
const { validateAnnoces } = require('../middlewares/annonces');
const { getAllAnnonces, 
        getAnnonce, 
        editAnnonce, 
        deleteAnnonce, 
        createAnnonce 
} = require('../services/annonces');
const { validateAuth, checkRoles } = require('../middlewares/auth');
const router = express.Router();

router.get('/', validateAnnoces, getAllAnnonces);

router.get('/:id', getAnnonce)

router.post('/', validateAnnoces, validateAuth, createAnnonce);

router.put('/:id', validateAnnoces, editAnnonce);

router.delete('/:id', validateAuth, checkRoles, deleteAnnonce);

module.exports = router;