import React from 'react';
import NavBar from './components/common/NavBar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-fond p-4 pb-20">
      {children}
      <NavBar />
    </div>
  );
};

export default Layout;
