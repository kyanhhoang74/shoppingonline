import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Cookie from "js-cookie";
import { GlobalContext } from "./GlobalContext/GlobalContext";
import { useContext } from "react";

import React, { useEffect } from "react";
import axios from "axios";
import AddNewProduct from "./pages/AddNewProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  //console.log(Cookie.get("jwt_token"));

  const navigate = useNavigate();

  const { IsLoggedIn, LoginStatus } = useContext(GlobalContext);

  //console.log(LoginStatus);

  const token = Cookie.get("jwt_token");
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/customer/verify_account",
        { token },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (!res.data.status) {
          Cookie.remove("jwt_token");
          const { pathname } = window.location; // Get current URL path

          // Decide which page to navigate based on pathname or other criteria
          if (pathname === "/register" || pathname === "/") {
            // Handle potential issue with being on the register page already
            console.warn("Already on register page. Handling accordingly (e.g., display error message).");
          } else {
            navigate("/login"); // Navigate to login page if not already on register
          }
          IsLoggedIn(false);
        } else {
          //console.log(res.data);
          IsLoggedIn(true);
          //navigate("/");
          // console.log("console");
        }
      })
      .catch((err) => {
        console.log(`Request err: ${err}`);
      });
  }, [navigate]);

  return (
    <div className="App">
      <div className="fixed w-full">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addnewproduct" element={<AddNewProduct />} />
        <Route path="productdetails/:productid" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
