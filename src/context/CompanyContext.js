import { createContext, useReducer, useState } from "react";
import axios from "axios";

export const CompaniesContext = createContext();

// keep local data in sync with database
export const companiesReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPANIES":
      return {
        companies: action.payload,
      };
    case "CREATE_COMPANY":
      return {
        companies: [...state.companies, action.payload],
      };
    case "EDIT_COMPANY":
      return {
        companies: [
          ...state.companies.map((company) =>
            company._id === action.payload._id ? action.payload : company
          ),
        ],
      };
    case "DELETE_COMPANY":
      return {
        companies: [
          ...state.companies.filter(
            (company) => company._id !== action.payload._id
          ),
        ],
      };
    default:
      return state;
  }
};

export const CompaniesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(companiesReducer, {
    companies: null,
  });

  const [loading, setLoading] = useState(false);

  const fetchCompanies = async (user) => {
    setLoading(true);
    const response = await axios.get("http://localhost:5000/companies", {
      headers: { token: user.token },
    });
    if (response.data) {
      let data = response.data.map((company) => {
        company.key = company._id;
        return company;
      });
      dispatch({ type: "SET_COMPANIES", payload: data });
      setLoading(false);
    }
  };

  return (
    <CompaniesContext.Provider
      value={{ ...state, fetchCompanies, companyLoading: loading, dispatch }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
