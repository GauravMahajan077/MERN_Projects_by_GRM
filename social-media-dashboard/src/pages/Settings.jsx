// src/pages/Settings.jsx

import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext.jsx';

export default function Settings() {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <button 
        onClick={toggleTheme} 
        className="bg-purple-500 text-white p-2 rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
}