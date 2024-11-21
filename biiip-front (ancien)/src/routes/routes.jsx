import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/pages/Login';
import Dashboard from '../components/pages/Dashboard';
import Historique from '../components/pages/Historique';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/historique"
        element={
          <ProtectedRoute>
            <Layout>
              <Historique />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
