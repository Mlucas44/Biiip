// index.js
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // Pour parser le JSON
const sequelize = require('./sequelize');
const errorHandler = require('./middleware/errorHandler');

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connecté à la base de données MySQL avec Sequelize');
    // Synchroniser les modèles après s'être connecté
    return sequelize.sync();
  })
  .then(() => {
    console.log('Les modèles ont été synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion ou de la synchronisation :', err);
  });

// Importation des routeurs
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Utilisation des routeurs
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
