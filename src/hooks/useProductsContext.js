import { ProductsContext } from "../context/ProductContext";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be inside a provider");
  }
  return context;
};
