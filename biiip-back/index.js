const fs = require('fs');
const https = require('https');
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
const pourboiresRouter = require('./routes/pourboires');

// Redirection HTTP vers HTTPS
// app.use((req, res, next) => {
//   if (req.secure) {
//     next();
//   } else {
//     res.redirect(`https://${req.headers.host}${req.url}`);
//   }
// });

// Utilisation des routeurs
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/payment', paymentRouter);
app.use('/pourboires', pourboiresRouter);

// Middleware de gestion des erreurs
app.use(errorHandler);

const createDefaultUser = async () => {
  const User = require('./models/User');
  try {
    const defaultEmail = process.env.DEFAULT_USER_EMAIL;
    const defaultPassword = process.env.DEFAULT_USER_PASSWORD;
    const defaultName = process.env.DEFAULT_USER_NAME;

    const user = await User.findOne({ where: { email: defaultEmail } });
    if (!user) {
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

const createDefaultPourboires = async () => {
  const Pourboire = require('./models/Pourboire'); // vérifie le chemin
  try {
    // On vérifie s'il y a déjà des pourboires
    const existingPourboiresCount = await Pourboire.count();

    if (existingPourboiresCount === 0) {
      // Si aucun pourboire n'existe, on insère nos 20 pourboires
      const pourboiresData = [
        { amount: 2.50, rating: 5, review: 'Service impeccable, merci !' },
        { amount: 3.00, rating: 4, review: 'Rapide et efficace' },
        { amount: 4.25, rating: 5, review: 'Très sympa, top accueil' },
        { amount: 1.50, rating: 3, review: 'OK, mais peut mieux faire' },
        { amount: 2.75, rating: 4, review: 'Bon service' },
        { amount: 5.00, rating: 5, review: 'Exceptionnel, je recommande !' },
        { amount: 3.50, rating: 4, review: 'Sympathique et professionnel' },
        { amount: 2.00, rating: 3, review: 'Accueil correct' },
        { amount: 1.00, rating: 2, review: 'Un peu déçu par l\'attente' },
        { amount: 4.00, rating: 5, review: 'Rien à dire, parfait !' },
        { amount: 2.20, rating: 3, review: 'Ça passe, sans plus' },
        { amount: 3.75, rating: 4, review: 'Bonne réactivité' },
        { amount: 4.50, rating: 5, review: 'Super équipe, merci encore' },
        { amount: 2.10, rating: 3, review: 'Peut mieux faire, mais correct' },
        { amount: 1.75, rating: 2, review: 'Service lent' },
        { amount: 2.45, rating: 4, review: 'Au top' },
        { amount: 3.00, rating: 3, review: 'Service assez bon, sans plus' },
        { amount: 3.10, rating: 4, review: 'Aimable et serviable' },
        { amount: 4.80, rating: 5, review: 'Incroyable expérience' },
        { amount: 2.50, rating: 3, review: 'Moyen, mais fait le job' },
      ];

      await Pourboire.bulkCreate(pourboiresData);
      console.log('Les 20 pourboires par défaut ont été créés avec succès !');
    } else {
      console.log('Des pourboires existent déjà en base, aucune insertion n\'a été faite.');
    }
  } catch (error) {
    console.error('Erreur lors de la création des pourboires par défaut :', error);
  }
};


// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connecté à la base de données MySQL avec Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    createDefaultPourboires();
    createDefaultUser();
    console.log('Les modèles ont été synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion ou de la synchronisation :', err);
  });

// const httpsOptions = {
//   key: fs.readFileSync('/etc/letsencrypt/live/biiip.back.mlucas.store/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/biiip.back.mlucas.store/fullchain.pem')
// };

// // Créer le serveur HTTPS
// https.createServer(httpsOptions, app).listen(port, '0.0.0.0', () => {
//   console.log(`Server is running at https://biiip.back.mlucas.store`);
// });

app.listen(port, '0.0.0.0', () => {
  console.log(`HTTP server listening on port ${port}`);
});