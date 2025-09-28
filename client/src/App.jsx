import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeBuilder from "./assets/QRCodeBuilder";
import Login from "./assets/Login";
import MainPage from "./assets/MainPage";

export default function App() {
  return (
    <BrowserRouter>
    <MainPage/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<QRCodeBuilder />} />
        <Route path="/mainpage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}
