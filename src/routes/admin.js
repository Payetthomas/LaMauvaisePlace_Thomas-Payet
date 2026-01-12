const express = require('express');
const router = express.Router();
const { checkRoles, validateAuth } = require('../middlewares/auth');
const { getAnnoncesAdmin, getAnnoncesBySeller, updateStatusAnnonce } = require('../services/annonces');
const { getUsers } = require('../services/users');

router.get('/annonces', validateAuth, checkRoles("Admin"), getAnnoncesAdmin);

router.get('/annonceurs', validateAuth, checkRoles("Admin"), getUsers);

router.get('/annonceurs/annonces', validateAuth,  checkRoles("Admin"), getAnnoncesBySeller);

router.post('/annonces/:id', validateAuth, checkRoles("Admin"), updateStatusAnnonce);

module.exports = router;
