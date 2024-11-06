// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Route POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Créer un nouvel utilisateur
    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    // Comparer les mots de passe
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    // Créer le token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
