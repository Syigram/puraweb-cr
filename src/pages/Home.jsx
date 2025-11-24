import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Pricing from "../components/home/Pricing";
import Benefits from "../components/home/Benefits";
import Contact from "../components/home/Contact";
import CyberpunkTerrain from "../components/home/CyberpunkTerrain";

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onGetStarted={scrollToContact} />
      <CyberpunkTerrain />
      <Services />
      <Pricing onGetStarted={scrollToContact} />
      <Benefits />
      <Contact />
    </div>
  );
}