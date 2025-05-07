import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    const overlay = document.createElement('div');
    overlay.className = 'theme-fade active';
    document.body.appendChild(overlay);
  
    setTimeout(() => {
      setDarkMode(prev => !prev);
    }, 100); // trigger mode change
  
    setTimeout(() => {
      overlay.classList.remove('active');
      document.body.removeChild(overlay);
    }, 600); // fade out and remove
  };
  

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
