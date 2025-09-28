import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutUs from "./AboutUs";
import Contact from "./Contact";

function Homepage() {
  return (
    <div>
      <Hero />
      <Features />
      <AboutUs />
      <Contact />
    </div>
  );
}

export default Homepage;
