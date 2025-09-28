import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QRCodeBuilder from "./assets/QRCodeBuilder";
import Login from "./assets/Login";
import MainPage from "./assets/MainPage";
import PublicLayout from "./layouts/PublicLayout";
import Homepage from "./pages/Homepage";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      {/* <MainPage /> */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
