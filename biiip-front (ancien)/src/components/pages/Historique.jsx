import React from 'react';
import NavBar from '../common/NavBar';
import BackButton from '../common/BackButton';
import { useNavigate } from 'react-router-dom';

function Historique () {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 bg-fond p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <BackButton />
        <h1 className="text-2xl font-bold text-principale">Historique</h1>
        <button className="p-2 bg-principale text-white rounded-full">🔔</button>
      </header>

      {/* Historique de transaction */}
      <section className="mb-6">
        <h3 className="text-lg font-medium text-principale mb-4">Depuis 7 jours</h3>
        <ul className="space-y-2">
          <li className="flex justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h4 className="text-principale font-semibold">Title</h4>
              <p className="text-gray-500 text-sm">Label and label</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">4/5</p>
              <p className="text-green-500">+0.5 €</p>
            </div>
          </li>
          <li className="flex justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h4 className="text-principale font-semibold">Title</h4>
              <p className="text-gray-500 text-sm">Label and label</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">4/5</p>
              <p className="text-green-500">+1.2 €</p>
            </div>
          </li>
        </ul>
        <h3 className="text-lg font-medium text-principale mt-6 mb-4">Depuis 1 mois</h3>
        <ul className="space-y-2">
          <li className="flex justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h4 className="text-principale font-semibold">Title</h4>
              <p className="text-gray-500 text-sm">Label and label</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">4/5</p>
              <p className="text-green-500">+0.5 €</p>
            </div>
          </li>
          <li className="flex justify-between bg-white p-4 rounded-lg shadow">
            <div>
              <h4 className="text-principale font-semibold">Title</h4>
              <p className="text-gray-500 text-sm">Label and label</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-500">4/5</p>
              <p className="text-green-500">+1.2 €</p>
            </div>
          </li>
        </ul>
        <button className="mt-4 w-full bg-principale text-white px-4 py-2 rounded">Explorer l'historique</button>
      </section>

      {/* NavBar */}
      <NavBar />
    </div>
  );
}

export default Historique;
