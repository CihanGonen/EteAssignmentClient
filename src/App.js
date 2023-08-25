import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Companies from "./pages/Companies";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./partials/Navbar";

import { useAuthContext } from "./hooks/useAuthContext";
import { useCompaniesContext } from "./hooks/useCompaniesContext";
import { useProductsContext } from "./hooks/useProductsContext";

function App() {
  const { fetchCompanies } = useCompaniesContext();
  const { fetchProducts } = useProductsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDatas = async () => {
      await fetchCompanies(user);
      await fetchProducts(user);
    };

    if (user) {
      fetchDatas();
    }
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/companies"
              element={user ? <Companies /> : <Navigate to="/login" />}
            />
            <Route
              path="/products"
              element={user ? <Products /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
