import { createContext, useReducer, useState } from "react";
import axios from "axios";

export const ProductsContext = createContext();

// keep local data in sync with database
export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        products: [...state.products, action.payload],
      };
    case "EDIT_PRODUCT":
      return {
        products: [
          ...state.products.map((product) =>
            product._id === action.payload._id ? action.payload : product
          ),
        ],
      };
    case "DELETE_PRODUCT":
      return {
        products: [
          ...state.products.filter(
            (product) => product._id !== action.payload._id
          ),
        ],
      };
    case "DELETE_COMPANY":
      return {
        products: [
          ...state.products.filter(
            (product) => product.company._id !== action.payload._id
          ),
        ],
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });

  const [loading, setLoading] = useState(false);

  const fetchProducts = async (user) => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/products", {
      headers: { token: user.token },
    });
    if (response.data) {
      let data = response.data.map((product) => {
        product.key = product._id;
        return product;
      });
      dispatch({ type: "SET_PRODUCTS", payload: data });
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{ ...state, fetchProducts, productLoading: loading, dispatch }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
