// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Si le token existe, rediriger vers la page protégée
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700">Adresse email</label>
            <input
              id="email"
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded hover:bg-indigo-500 focus:outline-none"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
