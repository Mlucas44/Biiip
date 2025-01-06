import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from '../axiosConfig';
import Logo from '../../public/images/Logo-Principal.svg';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51QIX2OAL8Mb1lB3Ma9DnZSCkpTsLX8C13JLlyzACz4zV0Zshg3yJzEIE0OP84SX0uvsCRxE2vUdddRJf4liuxhD900c92i90E4');

function CheckoutForm() {
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
    setAmount((prevAmount) => Math.max(0, prevAmount + change));
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

  const handleBackClick = () => {
    setClientSecret('');
    setShowPaymentElement(false);
    setMessage(null);
  };

  const appearance = { theme: 'flat' };
  const options = { clientSecret, appearance };

  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-white py-8 px-4"
      style={{
        backgroundImage: "url('/images/background.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center mb-6">
        <img src={Logo} alt="Logo" className="h-24" />
      </div>
      <h3 className="text-3xl font-bold mb-6 text-center text-primary">Offrez un pourboire</h3>

      {!showPaymentElement ? (
        <div className="flex flex-col gap-4 max-w-md w-full">
          {/* Bloc montant */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <label className="block text-primary text-sm font-medium mb-2">Laisser un pourboire :</label>
            <div className="flex items-center justify-between bg-background py-2 px-4 rounded-md shadow-inner">
              <button
                type="button"
                onClick={() => handleAmountChange(-1)}
                className="text-primary text-lg font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                className="text-[#1F2B53] text-lg font-semibold text-center w-16 bg-transparent border-none focus:outline-none"
                min="0"
              />
              {/* <span className="text-primary text-lg font-semibold">{amount}</span> */}
              <button
                type="button"
                onClick={() => handleAmountChange(1)}
                className="text-primary text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Bloc avis et satisfaction */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="mb-6">
              <label className="block text-primary text-sm font-medium mb-2">Laisser un avis :</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#499CD6] text-sm"
                rows="3"
                placeholder="Votre avis..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-primary text-sm font-medium mb-2">Note de satisfaction :</label>
              <div className="flex justify-center items-center space-x-4">
                {[...Array(5)].map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`text-5xl ${index < rating ? 'text-[#FABB44]' : 'text-gray-300'} hover:text-[#FABB44] transition-colors`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="mt-3 text-primary text-sm">Note de {rating} étoile(s)</p>
            </div>
            <button
              type="button"
              className="w-full bg-primary text-white py-2 rounded-3xl font-medium hover:bg-[#162243] transition-all duration-300 flex items-center justify-center gap-2 mb-2"
            >
              <span className="text-center text-sm">Laisser un avis sur Google</span>
              <img src="/images/google.svg" alt="Google Logo" className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="w-full bg-primary text-white py-2 rounded-3xl font-medium hover:bg-[#162243] transition-all duration-300 flex items-center justify-center gap-2 mb-2"
            >
              <span className="text-center text-sm">Laisser un avis sur Tripadvisor</span>
              <img src="/images/tripadvisor.svg" alt="Google Logo" className="w-6 h-6" />
            </button>

          </div>

          {/* Bloc bouton */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <button
              type="button"
              onClick={handlePaymentButtonClick}
              className="w-full bg-primary text-white text-lg py-2 rounded-3xl font-medium hover:bg-[#162243] transition-all duration-300"
            >
              Payer
            </button>

            {message && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md shadow-sm">
                {message}
              </div>
            )}
          </div>
        </div>
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
