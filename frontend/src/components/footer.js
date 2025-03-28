import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">&copy; {new Date().getFullYear()} Task Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
