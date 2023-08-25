import { CompaniesContext } from "../context/CompanyContext";
import { useContext } from "react";

export const useCompaniesContext = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error("useCompaniesContext must be inside a provider");
  }
  return context;
};
