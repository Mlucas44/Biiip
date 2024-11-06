// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Récupérer le token depuis les en-têtes
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé : aucun token fourni' });
  }
  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};

module.exports = authMiddleware;
