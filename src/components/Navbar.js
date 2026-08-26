import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Make sure this import is present if using a separate CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>🔬</span>
        <span>Lab Tracker</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/equipment" className={({ isActive }) => (isActive ? 'active' : '')}>
          Catalogue
        </NavLink>
        <NavLink to="/issue" className={({ isActive }) => (isActive ? 'active' : '')}>
          Issue/Return
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>
          History
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;