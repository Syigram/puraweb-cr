import React, { useEffect } from "react";
import Pricing from "@/components/home/Pricing";

export default function Planes() {
  useEffect(() => {
    document.title = "Planes - PuraWeb CR";
  }, []);

  return (
    <div className="pt-20">
      <Pricing />
    </div>
  );
}