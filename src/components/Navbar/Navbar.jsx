import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={styles.navbar}>      
      <div className={styles.logo}>QuickMart POS
      <button onClick={toggleTheme} className={styles.themeToggle}>
          <div className={`${styles.toggleTrack} ${darkMode ? styles.dark : ''}`}>
            <div className={styles.toggleThumb}>
              {darkMode ? '🌙' : '☀️'}
            </div>
          </div>
        </button>
      </div>
      
      <div className={styles.links}>
        <NavLink to="/Pos" className={({ isActive }) => isActive ? styles.active : ''}>POS</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? styles.active : ''}>Products</NavLink>
        <NavLink to="/customers" className={({ isActive }) => isActive ? styles.active : ''}>Customers</NavLink>
        <NavLink to="/Dashboard" className={({ isActive }) => isActive ? styles.active : ''}>Dashboard</NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
