import React from "react";
import { Navigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PortafolioLista() {
  return <Navigate to={createPageUrl("Portafolio")} replace />;
}