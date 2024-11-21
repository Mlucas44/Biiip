// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../axiosConfig';
import Logo from '../../public/images/Logo-Principal.svg';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51QIX2OAL8Mb1lB3Ma9DnZSCkpTsLX8C13JLlyzACz4zV0Zshg3yJzEIE0OP84SX0uvsCRxE2vUdddRJf4liuxhD900c92i90E4');

function CheckoutForm () {
  const [amount, setAmount] = useState(5);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [showPaymentElement, setShowPaymentElement] = useState(false);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleAmountChange = (change) => {
    setAmount((prevAmount) => Math.max(1, prevAmount + change));
  };

  const handlePaymentButtonClick = async () => {
    try {
      const response = await axios.post('/payment/create-payment-intent', {
        amount: amount * 100,
      });
      setClientSecret(response.data.clientSecret);
      console.log('ClientSecret:', clientSecret);
      console.log('Envoi de la requête vers Stripe...');

      setShowPaymentElement(true);
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent :', error);
      setMessage('Une erreur est survenue lors de la préparation du paiement.');
    }
  };

  const handleBackClick = () => {
    setClientSecret('');
    setShowPaymentElement(false);
    setMessage(null);
  };

  const appearance = { theme: 'flat' };
  const options = { clientSecret, appearance };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8 px-4 sm:px-6 lg:px-8">
      {!showPaymentElement ? (
        <form className="relative max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="Logo" className="h-12" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center text-primary">Offrez un pourboire</h3>

          <div className="mb-3">
            <label className="block text-secondary-red text-sm mb-1">Montant du pourboire (€) :</label>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleAmountChange(-1)}
                className="px-3 py-1 bg-secondary  rounded-md hover:bg-secondary-dark transition"
              >
                -
              </button>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                min="1"
                className="w-16 text-center px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                required
              />
              <button
                type="button"
                onClick={() => handleAmountChange(1)}
                className="px-3 py-1 bg-secondary  rounded-md hover:bg-secondary-dark transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-secondary-red text-sm mb-1">Laisser un avis :</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              rows="3"
              placeholder="Votre avis..."
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="block text-secondary-red text-sm mb-1">Satisfaction :</label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={`text-5xl ${index < rating ? 'text-accentuation' : 'text-gray-300'} hover:text-accentuation transition-colors`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="mt-1 text-secondary-red text-sm">Note : {rating} étoile(s)</p>
          </div>

          <button
            type="button"
            onClick={handlePaymentButtonClick}
            className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-primary-dark transition-all duration-300"
          >
            Payer
          </button>

          {message && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm">
              {message}
            </div>
          )}
        </form>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm
              amount={amount}
              review={review}
              rating={rating}
              message={message}
              setMessage={setMessage}
              onBack={handleBackClick}
            />
          </Elements>
        )
      )}
    </div>
  );
}

export default CheckoutForm;
