import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Bill from "./pages/Bill/Bill";
import Customer from "./pages/Customer/Customer";
import Statistic from "./pages/Statistic/Statistic";
import Register from "./pages/auth/Register";
import Login from "./components/auth/Login";
import Product from "./pages/Product/Product";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    return () => {};
  }, [cart]);//cart her yenilendiğinde tutması için yazmamız gerekiryordy

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RouteControl>
                <Home />
              </RouteControl>
            }
          />
          <Route
            path="/cart"
            element={
              <RouteControl>
                <Cart />
              </RouteControl>
            }
          />
          <Route
            path="/bills"
            element={
              <RouteControl>
                <Bill />
              </RouteControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouteControl>
                <Customer />
              </RouteControl>
            }
          />
          <Route
            path="/statistic"
            element={
              <RouteControl>
                <Statistic />
              </RouteControl>
            }
          />
          <Route
            path="/products"
            element={
              <RouteControl>
                <Product />
              </RouteControl>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
