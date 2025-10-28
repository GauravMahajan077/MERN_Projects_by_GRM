// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username && password) {
      // NOTE: This simulates a logged-in user. In a real app, you'd get this from an API.
      // We give the user an ID of 1 so they can create posts.
      setUser({ id: 1, username: username });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);