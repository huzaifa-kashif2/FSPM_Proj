import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeBuilder from "./assets/QRCodeBuilder";
import Login from "./assets/Login";
import MainPage from "./assets/MainPage";
import PublicLayout from "./layouts/PublicLayout";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      {/* <MainPage /> */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
