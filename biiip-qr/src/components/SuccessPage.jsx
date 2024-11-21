// src/components/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../public/images/Logo-Principal.svg';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-lg">
        <img src={Logo} alt="Logo" className="h-12 mb-6" />
        <h2 className="text-3xl font-bold mb-4 text-center text-primary">Merci pour votre pourboire !</h2>
        <p className="text-center text-secondary-red mb-6">
          Nous apprécions grandement votre générosité et votre soutien.
        </p>
        <Link
          to="/"
          className="bg-primary text-white py-2 px-4 rounded-md font-medium text-sm hover:bg-primary-dark transition-all duration-300"
        >
          Donner à nouveau
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
