// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    // Rediriger vers '/' si l'utilisateur n'est pas authentifié
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
