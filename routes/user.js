const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { verificarToken, soloAdmin } = require('../middleware/auth');

router.post('/register', verificarToken, soloAdmin, createUser);

module.exports = router;
