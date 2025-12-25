import React, { useEffect } from "react";
import Pricing from "@/components/home/Pricing";
import PlanComparisonTable from "@/components/pricing/PlanComparisonTable";

export default function Planes() {
  useEffect(() => {
    document.title = "Planes - PuraWeb CR";
  }, []);

  return (
    <div className="pt-20">
      <Pricing />
      <PlanComparisonTable />
    </div>
  );
}