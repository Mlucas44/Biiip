// src/components/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/Logo-Principal.svg';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: "url('/images/background.svg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
       <div className="flex justify-center mb-6">
              <img src={Logo} alt="Logo" className="h-24" />
        </div>
        <h3 className="text-3xl font-bold mb-6 text-center text-primary">Merci pour votre pourboire !</h3>

      <div className="max-w-md w-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl">
      <label className="block text-primary text-center text-xl font-medium mb-2">Nous apprécions grandement votre générosité et votre soutien.</label>
      <img src="/images/mascotte-logo.svg" alt="Google Logo" className="w-32 h-32 mb-4" />

        <button
          type="button"
          className="w-full bg-primary text-white py-2 rounded-3xl font-medium hover:bg-[#162243] transition-all duration-300 flex items-center justify-center gap-3 mb-3"
        >
          <span className="text-center text-sm">Laisser un avis sur Google</span>
          <img src="/images/google.svg" alt="Google Logo" className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="w-full bg-primary text-white py-2 rounded-3xl font-medium hover:bg-[#162243] transition-all duration-300 flex items-center justify-center gap-3 mb-3"
        >
          <span className="text-center text-sm">Laisser un avis sur Tripadvisor</span>
          <img src="/images/tripadvisor.svg" alt="Google Logo" className="w-6 h-6" />
        </button>
        <Link
          to="/"
          className=" w-full bg-primary text-white py-2 px-4 rounded-3xl font-medium text-sm hover:bg-primary-dark transition-all duration-300 flex items-center justify-center gap-3 mb-2"
        >
          Donner à nouveau  <img src="/images/etoile.svg" alt="Google Logo" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
