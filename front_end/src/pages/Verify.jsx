import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Outlet,useNavigate } from "react-router-dom"
import Cookie from "js-cookie";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { useContext } from "react";
import axios from "axios";
const Verify = () => {
    const navigate = useNavigate();
    const { isLoggedIn, handleLogout } = useContext(GlobalContext);
  
    const token = Cookie.get("jwt_token");
  
    useEffect(() => {
      axios
        .post(
          "http://localhost:5000/api/customer/verify_account",   
  
          { token },
          { withCredentials: true }
        )
        .then((res) => {
          if (!res.data.status) {
            console.error("Authentication failed:", res.data.error); // Access specific error data
            Cookie.remove("jwt_token");
            isLoggedIn(false);
            navigate("/login");
          } else {
            isLoggedIn(true);
            // navigate("/"); // Handle successful verification (optional)
          }
        })
        .catch((err) => {
          console.error(`Request error: ${err}`); // Handle network or server errors
        });
    }, [navigate]);
  
    return null;
  };
export default Verify;