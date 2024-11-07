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
const authRouter = require('./routes/auth');
const paymentRouter = require('./routes/payment');

// Importation des routeurs
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Utilisation des routeurs
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/payment', paymentRouter);

// Middleware de gestion des erreurs
app.use(errorHandler);

const createDefaultUser = async () => {
  const User = require('./models/User');

  try {
    const defaultEmail = process.env.DEFAULT_USER_EMAIL;
    const defaultPassword = process.env.DEFAULT_USER_PASSWORD;
    const defaultName = process.env.DEFAULT_USER_NAME;

    // Vérifier si l'utilisateur existe déjà
    const user = await User.findOne({ where: { email: defaultEmail } });
    if (!user) {
      // Créer l'utilisateur (le mot de passe sera hashé par le hook beforeCreate)
      await User.create({
        name: defaultName,
        email: defaultEmail,
        password: defaultPassword,
      });
      console.log('Utilisateur par défaut créé avec succès.');
    } else {
      console.log('L\'utilisateur par défaut existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur par défaut :', error);
  }
};
// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connecté à la base de données MySQL avec Sequelize');
    // Synchroniser les modèles après s'être connecté
    return sequelize.sync();
  })
  .then(() => {
    createDefaultUser();
    console.log('Les modèles ont été synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion ou de la synchronisation :', err);
  });


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://51.75.143.134:${port}`);
});
