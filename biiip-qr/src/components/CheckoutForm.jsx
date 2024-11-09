import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, PaymentElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import axios from '../axiosConfig';

const stripePromise = loadStripe('pk_test_51QIX2OAL8Mb1lB3Ma9DnZSCkpTsLX8C13JLlyzACz4zV0Zshg3yJzEIE0OP84SX0uvsCRxE2vUdddRJf4liuxhD900c92i90E4'); // Remplacez par votre clé publique Stripe

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

  const handlePaymentButtonClick = async () => {
    try {
      const response = await axios.post('/payment/create-payment-intent', {
        amount: amount * 100,
      });
      setClientSecret(response.data.clientSecret);
      setShowPaymentElement(true);
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent :', error);
      setMessage('Une erreur est survenue lors de la préparation du paiement.');
    }
  };

  const appearance = { theme: 'flat' };
  const options = { clientSecret, appearance };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8 px-4 sm:px-6 lg:px-8">
      {!showPaymentElement ? (
        <form className="relative max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <div className="flex justify-center mb-4">
            {/* Vous pouvez insérer votre logo ici */}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center text-primary">Offrez un pourboire</h3>

          <div className="mb-3">
            <label className="block text-secondary-red text-sm mb-1">Montant du pourboire (€) :</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              required
            />
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
                  className={`text-xl ${index < rating ? 'text-accentuation' : 'text-gray-300'} hover:text-accentuation transition-colors`}
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
        </form>
      ) : (
        clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm amount={amount} message={message} setMessage={setMessage} />
          </Elements>
        )
      )}
    </div>
  );
}

function PaymentForm ({ amount, message, setMessage }) {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState(null);
  const [showPaymentRequestButton, setShowPaymentRequestButton] = useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

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
  }, [stripe, amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
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
    <form onSubmit={handleSubmit} className="relative max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-3">
        <label className="block text-secondary-red text-sm mb-1">Informations de paiement :</label>
        <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-primary">
          {showPaymentRequestButton && paymentRequest && (
            <div className="mb-4">
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </div>
          )}
          <PaymentElement />
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-primary text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-primary-dark transition-all duration-300 disabled:opacity-50"
      >
        Confirmer le paiement
      </button>
      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md shadow-sm">
          {message}
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
