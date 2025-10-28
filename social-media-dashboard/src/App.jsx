// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index.js';
import ThemeProvider from './contexts/ThemeContext.jsx';
import AuthProvider, { useAuth } from './contexts/AuthContext.jsx';

import Navbar from './components/Navbar.jsx';
import Feed from './pages/Feed.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';

// This component checks if a user is logged in before showing a page
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                  {/* Redirect any other path to the feed */}
                  <Route path="*" element={<Navigate to="/feed" />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;