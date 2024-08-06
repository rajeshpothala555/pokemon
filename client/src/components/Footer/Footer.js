import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-left">&copy; 2024 Rajesh Pothala. All rights reserved.</p>
        <p className="footer-right">
          Mobile: <a href="+917075753534">+91 7075753534</a><br />
          Email: <a href="pothalarajesh282@gmail.com">pothalarajesh282@gmail.com</a>
        </p>
      </div>
      <p className="note">
        NOTE : Currently, I am focused on client projects, so the CSS and styling may not be fully polished. All backend and frontend functionalities are functional.
      </p>
    </footer>
  );
};

export default Footer;
