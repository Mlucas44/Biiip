import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setRedirect(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setRedirect(true);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Email ou mot de passe incorrect.');
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-fond px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-2xl space-y-8 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <h2 className="text-4xl font-semibold text-center text-principale">Bienvenue chez Biiip</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-base font-medium text-principale">Adresse email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-principale focus:ring-2 focus:ring-principale"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-medium text-principale">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-principale focus:ring-2 focus:ring-principale"
            />
          </div>
          {errorMessage && (
            <p className="text-secondaire-rouge text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-4 bg-principale text-white text-lg rounded-lg hover:bg-opacity-90 transition duration-200 focus:outline-none focus:ring-2 focus:ring-principale"
          >
            Se connecter
          </button>
        </form>
        <p className="text-center text-principale text-base">
          Vous n'avez pas de compte ? <a href="/register" className="text-secondaire-rouge hover:underline">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  );

}

export default Login;
