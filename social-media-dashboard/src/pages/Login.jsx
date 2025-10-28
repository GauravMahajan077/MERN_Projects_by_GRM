// src/pages/Login.jsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
    navigate('/feed');
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="border p-2 mb-4 w-full text-black rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 mb-6 w-full text-black rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
            required
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}