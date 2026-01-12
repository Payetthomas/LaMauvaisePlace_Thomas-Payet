const express = require ('express');
const router = express.Router();
const { register, login } = require('../services/auth');
const { getMyProfil } = require('../services/users');
const { validateAuth } = require('../middlewares/auth');

router.post('/login', login);

router.post('/register', register);

router.get('/', validateAuth, getMyProfil);

module.exports = router;