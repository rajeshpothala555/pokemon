import React from 'react';
import Footer from '../Footer/Footer';
import './Layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
