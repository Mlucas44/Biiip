import React from 'react';

function NavBar () {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-principale p-2 flex justify-around text-white">
      <button className="flex flex-col items-center">
        <span>🏠</span>
        <span className="text-sm">Accueil</span>
      </button>
      <button className="flex flex-col items-center">
        <span>⭐</span>
        <span className="text-sm">Comptes</span>
      </button>
      <button className="flex flex-col items-center">
        <span>👤</span>
        <span className="text-sm">Mon profil</span>
      </button>
    </nav>
  );
}

export default NavBar;
