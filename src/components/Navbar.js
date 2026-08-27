import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-brand">
        <span className="brand-icon">🔬</span>
        <span className="brand-title">Lab Tracker</span>
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Dashboard
        </NavLink>
        <NavLink to="/equipment" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Catalogue
        </NavLink>
        <NavLink to="/issue" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Issue/Return
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          History
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;