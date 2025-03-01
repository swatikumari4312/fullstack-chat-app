import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage.jsx';
import SettingPage from "./pages/SettingPage";
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {useThemeStore} from './store/useThemeStore.js'

const App = () => {
  // Retrieve Zustand state
  const authUser = useAuthStore((state) => state.authUser);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const {onlineUsers} =useAuthStore();
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth); // ✅ Ensure this exists in Zustand store
  // const theme = useThemeStore((state) => state.theme);
  const {theme}=useThemeStore();


  console.log({onlineUsers});


  useEffect(() => {
    checkAuth();  // ✅ Ensure checkAuth is running correctly
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  // ✅ Show loader while checking authentication
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;