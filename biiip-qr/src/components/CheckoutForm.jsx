import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement, Elements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../axiosConfig';

import backgroundLogo from '../../public/images/Patern.svg';
import mainLogo from '../../public/images/Logo-Principal.svg';

const stripePromise = loadStripe('pk_test_51QIX2OAL8Mb1lB3Ma9DnZSCkpTsLX8C13JLlyzACz4zV0Zshg3yJzEIE0OP84SX0uvsCRxE2vUdddRJf4liuxhD900c92i90E4');

function CheckoutForm () {
  const [amount, setAmount] = useState(5);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [showPaymentRequestButton, setShowPaymentRequestButton] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Appeler l'API backend pour créer un PaymentIntent et récupérer le clientSecret
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post('/payment/create-payment-intent', {
          amount: amount * 100, // Convertir en centimes
        });
        setClientSecret(response.data.clientSecret);

        if (stripe) {
          const pr = stripe.paymentRequest({
            country: 'FR',
            currency: 'eur',
            total: {
              label: 'Total',
              amount: amount * 100,
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });

          pr.canMakePayment().then((result) => {
            if (result) {
              setPaymentRequest(pr);
              setShowPaymentRequestButton(true);
            }
          });
        }
      } catch (error) {
        console.error('Erreur lors de la création du PaymentIntent :', error);
      }
    };

    createPaymentIntent();
  }, [amount, stripe]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js n'a pas encore été chargé
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://your-site.com/success',
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          setMessage('Paiement réussi ! Merci pour votre pourboire et votre avis.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation du paiement :', error);
      setMessage('Une erreur est survenue lors du paiement.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-repeat">
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <form onSubmit={handleSubmit} className="relative max-w-lg w-full p-8 bg-white shadow-2xl rounded-lg">
            <div className="flex justify-center mb-4">
              <img src={mainLogo} alt="Logo" className="w-24 h-24" />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-center text-primary">Offrez un pourboire</h3>
            {showPaymentRequestButton && paymentRequest && (
              <div className="mb-4">
                <PaymentRequestButtonElement options={{ paymentRequest }} />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Montant du pourboire (€) :</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Informations de paiement :</label>
              <div className="px-3 py-2 rounded focus-within:ring-2 focus-within:ring-primary">
                <PaymentElement />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Laisser un avis :</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                rows="3"
                placeholder="Votre avis..."
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-lg">Satisfaction :</label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`text-2xl ${index < rating ? 'text-yellow-500' : 'text-gray-400'} focus:outline-none`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="mt-2 text-gray-700">Note : {rating} étoile(s)</p>
            </div>
            <button
              type="submit"
              disabled={!stripe}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors duration-300 disabled:opacity-50"
            >
              Payer
            </button>
            {message && (
              <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
                {message}
              </div>
            )}
          </form>
        </Elements>
      )}
    </div>
  );
}

export default CheckoutForm;
