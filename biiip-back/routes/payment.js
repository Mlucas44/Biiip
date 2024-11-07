const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Assure-toi que STRIPE_SECRET_KEY est défini dans ton fichier .env

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Le montant devrait être envoyé dans le corps de la requête

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd', // Change la devise si nécessaire
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
