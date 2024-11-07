// CheckoutForm.js
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from '../axiosConfig';

function CheckoutForm () {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/payment/create-payment-intent', {
        amount: amount * 100, // Convertir en centimes
      });

      const clientSecret = response.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setMessage('Paiement réussi ! Merci pour votre pourboire.');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent :', error);
      setMessage('Une erreur est survenue lors du paiement.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">Offrez un pourboire</h2>
      <div className="flex justify-center mb-6">
        {/* <FaCoffee className="text-primary text-6xl" /> */}
      </div>
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
        <label className="block text-gray-700 text-lg">Informations de la carte :</label>
        <div className="border px-3 py-2 rounded focus-within:ring-2 focus-within:ring-primary">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
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
  );
}

export default CheckoutForm;
