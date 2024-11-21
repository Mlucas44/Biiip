// Exemple dans Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import LogoutButton from '../common/LogoutButton';
import NavBar from '../common/NavBar';

function Dashboard () {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer les utilisateurs
    axios.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des utilisateurs :', error));
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-fond p-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-principale">Bienvenue Sandrine</h1>
          <button className="p-2 bg-principale text-white rounded-full">🔔</button>
        </header>

        {/* Balance card */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold text-principale">126,7 €</h2>
          <p className="text-sm text-gray-500">Depuis 01/01/2024</p>
          <button className="mt-4 bg-principale text-white px-4 py-2 rounded">Retirer</button>
        </section>

        {/* Transaction history */}
        <section className="mb-6">
          <h3 className="text-lg font-medium text-principale">Historique de transaction</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between bg-white p-4 rounded-lg shadow">
              <span>Transaction 1</span>
              <span className="text-green-500">+0.3 €</span>
            </li>
            <li className="flex justify-between bg-white p-4 rounded-lg shadow">
              <span>Transaction 2</span>
              <span className="text-red-500">-1.2 €</span>
            </li>
            <li className="flex justify-between bg-white p-4 rounded-lg shadow">
              <span>Transaction 3</span>
              <span className="text-green-500">+4 €</span>
            </li>
          </ul>
          <button
            onClick={() => navigate('/historique')}
            className="mt-4 w-full bg-principale text-white px-4 py-2 rounded"
          >
            Explorer l'historique
          </button>
        </section>

        {/* Chart section */}
        <section className="mt-6">
          <h3 className="text-lg font-medium text-principale">Tous vos pourboires</h3>
          <div className="bg-white p-6 rounded-lg shadow">
            {/* Placeholder for the chart */}
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <button className="w-full bg-principale text-white px-4 py-2 rounded">Voir mes statistiques de pourboire</button>
          </div>
        </section>
        <NavBar />
      </div>
      <h2>Tableau de bord</h2>
      {/* Afficher les utilisateurs */}
      <LogoutButton />

    </div>
  );
}

export default Dashboard;
