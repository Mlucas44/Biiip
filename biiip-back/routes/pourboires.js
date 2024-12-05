// routes/pourboires.js
const express = require('express');
const router = express.Router();
const pourboireController = require('../controllers/pourboireController');


// Route pour créer un pourboire
router.post('/', pourboireController.createPourboire);

// Route pour obtenir tous les pourboires
router.get('/', pourboireController.getAllPourboires);

// Route pour obtenir un pourboire par ID
router.get('/:id', pourboireController.getPourboireById);

module.exports = router;
