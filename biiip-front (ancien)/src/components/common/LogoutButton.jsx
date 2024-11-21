// src/components/LogoutButton.js
import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-500 focus:outline-none"
    >
      Se déconnecter
    </button>
  );
}

export default LogoutButton;
