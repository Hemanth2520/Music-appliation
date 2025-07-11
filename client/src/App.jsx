import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Librarypage from './pages/Librarypage';
import Radiopage from './pages/Radiopage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import Searchpage from './pages/Searchpage';
import PrivateRoute from './components/PrivateRoute';

import Logout from './pages/Logout'; 


const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white flex">
      {!hideNavbar && <Navbar />}
      <div className={`${!hideNavbar ? 'pl-64' : ''} w-full min-h-screen`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Searchpage /></PrivateRoute>} />
          <Route path="/library" element={<PrivateRoute><Librarypage /></PrivateRoute>} />
          <Route path="/radio" element={<PrivateRoute><Radiopage /></PrivateRoute>} />
          <Route path="/logout" element={<Logout />} />

          {/* Catch-all fallback to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
