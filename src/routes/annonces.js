const express = require('express');
const { validateAnnoces } = require('../middlewares/annonces');
const { getAllAnnonces, 
        getAnnonce, 
        editAnnonce, 
        deleteAnnonce, 
        createAnnonce 
} = require('../services/annonces');
const { validateAuth, checkRoles, manageAnnonce } = require('../middlewares/auth');
const { getMyAnnonces } = require('../services/users');
const router = express.Router();

router.get('/', getAllAnnonces);
router.get('/mes-annonces', validateAuth, getMyAnnonces)
router.get('/:id', getAnnonce);
router.post('/', validateAnnoces, validateAuth, createAnnonce);
router.put('/:id', validateAnnoces, validateAuth, manageAnnonce, editAnnonce);
router.delete('/:id',validateAuth, manageAnnonce, deleteAnnonce);

module.exports = router;