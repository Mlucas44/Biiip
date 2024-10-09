// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;
