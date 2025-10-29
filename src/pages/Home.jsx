import React from "react";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import Pricing from "../components/home/Pricing";
import Benefits from "../components/home/Benefits";
import Contact from "../components/home/Contact";

export default function Home() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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