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
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          {/* <Route element={<PrivateLayout />}> */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* </Route> */}
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
