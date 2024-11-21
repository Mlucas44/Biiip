// controllers/pourboireController.js
const Pourboire = require('../models/Pourboire');

// Créer un nouveau pourboire
exports.createPourboire = async (req, res) => {
  try {
    const { amount, rating, review } = req.body;

    // Validation des champs requis
    if (amount === undefined || rating === undefined) {
      return res.status(400).json({ message: 'Le montant et la note sont requis.' });
    }

    // Création du pourboire
    const pourboire = await Pourboire.create({
      amount,
      rating,
      review,
    });

    res.status(201).json(pourboire);
  } catch (err) {
    console.error('Erreur lors de la création du pourboire :', err);
    res.status(500).send('Erreur serveur');
  }
};

// Récupérer tous les pourboires
exports.getAllPourboires = async (req, res) => {
  try {
    const pourboires = await Pourboire.findAll();
    res.json(pourboires);
  } catch (err) {
    console.error('Erreur lors de la récupération des pourboires :', err);
    res.status(500).send('Erreur serveur');
  }
};

// Récupérer un pourboire par ID
exports.getPourboireById = async (req, res) => {
  try {
    const { id } = req.params;
    const pourboire = await Pourboire.findByPk(id);

    if (!pourboire) {
      return res.status(404).json({ message: 'Pourboire non trouvé.' });
    }

    res.json(pourboire);
  } catch (err) {
    console.error('Erreur lors de la récupération du pourboire :', err);
    res.status(500).send('Erreur serveur');
  }
};
