// src/components/PaymentForm.jsx
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const PaymentForm = ({ amount, review, rating, message, setMessage, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Assurez-vous que cette URL correspond à votre route de succès

          // return_url: `${window.location.origin}/success`,

        },
        redirect: 'if_required',
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
          try {
            // Envoi des données du pourboire au backend
            await axios.post('/pourboires', {
              amount,
              rating,
              review,
            });

            // Redirection vers la page de succès
            navigate('/success');
          } catch (error) {
            console.error('Erreur lors de l\'enregistrement du pourboire :', error);
            setMessage('Le paiement a été effectué, mais une erreur est survenue lors de l\'enregistrement du pourboire.');
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation du paiement :', error);
      setMessage('Une erreur est survenue lors du paiement.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
      <button
        type="button"
        onClick={onBack}
        className="mb-3 text-primary hover:text-primary-dark"
      >
        ← Retour
      </button>
      <div className="mb-4">
        <p className="text-secondary-red text-sm mb-1">Montant : {amount} €</p>
        {review && <p className="text-secondary-red text-sm mb-1">Avis : {review}</p>}
        {rating > 0 && <p className="text-secondary-red text-sm mb-1">Note : {rating} étoile(s)</p>}
      </div>
      <div className="mb-3">
        <label className="block text-secondary-red text-sm mb-1">Informations de paiement :</label>
        <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary">
          <PaymentElement />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className={`w-full bg-primary text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-primary-dark transition-all duration-300 disabled:opacity-50 ${isLoading ? 'cursor-not-allowed' : ''
          }`}
      >
        {isLoading ? 'Traitement...' : 'Confirmer le paiement'}
      </button>
      {message && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm">
          {message}
        </div>
      )}
    </form>
  );
};

export default PaymentForm;
