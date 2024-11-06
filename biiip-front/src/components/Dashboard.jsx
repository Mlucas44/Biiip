// Exemple dans Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import LogoutButton from './LogoutButton';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer les utilisateurs
    axios.get('/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des utilisateurs :', error));
  }, []);

  return (
    <div>
      <h2>Tableau de bord</h2>
      {/* Afficher les utilisateurs */}
      <LogoutButton />

    </div>
  );
}

export default Dashboard;
