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
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

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

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connecté à la base de données MySQL avec Sequelize');
    return sequelize.sync();
  })
  .then(() => {
    createDefaultUser();
    console.log('Les modèles ont été synchronisés avec la base de données');
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion ou de la synchronisation :', err);
  });

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/biiip.mlucas.store/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/biiip.mlucas.store/fullchain.pem')
};

// Créer le serveur HTTPS
https.createServer(httpsOptions, app).listen(port, '0.0.0.0', () => {
  console.log(`Server is running at https://biiip.mlucas.store:${port}`);
});

