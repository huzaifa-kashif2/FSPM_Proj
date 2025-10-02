import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeBuilder from "./assets/QRCodeBuilder";
import Login from "./assets/Login";
import MainPage from "./assets/MainPage";
import PublicLayout from "./layouts/PublicLayout";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateLayout from "./layouts/PrivateLayout";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route>
          <Route path="/dash" element={<Dashboard />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}>
            <Route element={<PrivateLayout />}>
              {/* This is the private page that appears after successful sign-in */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add other private routes here (e.g., /profile, /settings) */}
        {/* </Route> */}
        {/* </Route> */}
        {/* --- Fallback Route --- */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
        //{" "}
      </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}
