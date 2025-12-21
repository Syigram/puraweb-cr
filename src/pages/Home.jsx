import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Pricing from "../components/home/Pricing";
import Benefits from "../components/home/Benefits";
import Contact from "../components/home/Contact";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "PuraWeb - Costa Rica venta aplicaciones y páginas Web";
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Hero onGetStarted={scrollToContact} />
      <Services />
      <Pricing onGetStarted={scrollToContact} />
      <Benefits />
      <Contact />
    </div>
  );
}