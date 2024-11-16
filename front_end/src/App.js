import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import Header from "./common/header/Header"
import Pages from "./pages/Pages"
import Data from "./components/Data"
import Cart from "./common/Cart/Cart"
import Cart_Order from "./common/Cart/Cart_Order"
import Footer from "./common/footer/Footer"
import Sdata from "./components/shops/Sdata"
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Products from "./scenes/products";
import Product_Detail from "./scenes/product/product_detail";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/product";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Category from "./scenes/category/index";
import Categories from "./scenes/categories/index";
import Login from "./pages/Login"
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import Orders from "./scenes/orders"
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const userID = localStorage.getItem('_id')
  const [successMessage, setSuccessMessage] = useState(null);
  /*
  step1 :  const { productItems } = Data 
  lai pass garne using props
  
  Step 2 : item lai cart ma halne using useState
  ==> CartItem lai pass garre using props from  <Cart CartItem={CartItem} /> ani import garrxa in cartItem ma
 
  Step 3 :  chai flashCard ma xa button ma

  Step 4 :  addToCart lai chai pass garne using props in pages and cart components
  */

  //Step 1 :
  const { productItems } = Data
  const { shopItems } = Sdata

  //Step 2 :
  const [CartItem, setCartItem] = useState([])

  //Step 4 :
  const addToCart = async (product, user_id) => {
    try {
      // Optimistic UI update: Add product to cart state immediately
      setCartItem([...CartItem, { ...product, qty: 1 }]);
  
      // Simulate API call to add item to server-side cart (replace with your actual API endpoint)
      const response = await axios.post("http://localhost:5000/api/oders/addorder", {
        product_id: product._id, // Extract product ID from the product object
        user_id,  // Use the provided user_id argument
      });
      // Check for successful response
      if (response.data.status === 1) {

        setSuccessMessage('Product added successfully!');
        toast.success('Product added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();

        // Keep the item added to the cart state
      } else {
        // Server-side addition failed, remove from cart state
        console.error("Server-side addition failed:", response.data.message);
        setCartItem(CartItem.filter((item) => item.id !== product.id));
        alert(`Error adding item to cart: ${response.data.message}`);  // More specific message
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      setCartItem(CartItem.filter((item) => item.id !== product.id));
      alert("Error adding item to cart. Please try again.");
    }
  };

  const deleteToCart = async (order_id, product, user_id) => {
    try {
      // Optimistic UI update: Add product to cart state immediately
  
      // Simulate API call to add item to server-side cart (replace with your actual API endpoint)
      const response = await axios.delete(`http://localhost:5000/api/oders/delete/${order_id}`, {
        _id: order_id,
        product_id: product._id, // Extract product ID from the product object
        user_id,  // Use the provided user_id argument // Extract product ID from the product object
         // Use the provided user_id argument
      });
      console.log("data",response)
      // Check for successful response
      if (response.data.status === 1) {

        setSuccessMessage('Delete order!');
        toast.success('Delete order successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();

        // Keep the item added to the cart state
      } else {
        // Server-side addition failed, remove from cart state
        console.error("Server-side addition failed:", response.data.message);
      
        alert(`Error detele item to cart: ${response.data.message}`);  // More specific message
      }
    } catch (error) {
      console.error("Error detele item to cart:", error);
      alert("Error detele item to cart. Please try again.");
    }
  };

  const editqtyorder = async (order_id) => {
    try {
      // Optimistic UI update: Add product to cart state immediately
  
      // Simulate API call to add item to server-side cart (replace with your actual API endpoint)
      const response = await axios.put(`http://localhost:5000/api/oders/editqtyorder/${order_id}`, {
        _id: order_id, // Extract product ID from the product object
         // Use the provided user_id argument
      });
      console.log("data",response)
      // Check for successful response
      if (response.data.status === 1) {

        setSuccessMessage('Delete order!');
        toast.success('Delete order successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();

        // Keep the item added to the cart state
      } else {
        // Server-side addition failed, remove from cart state
        console.error("Server-side editqtyorder failed:", response.data.message);
      
        alert(`Error editqtyorder item to cart: ${response.data.message}`);  // More specific message
      }
    } catch (error) {
      console.error("Error editqtyorder item to cart:", error);
      alert("Error editqtyorder item to cart. Số lượng không thể giảm xuống 0.");
    }
  };

  const check = async (order_id) => {
    try {
      // Optimistic UI update: Add product to cart state immediately
  
      // Simulate API call to add item to server-side cart (replace with your actual API endpoint)
      const response = await axios.put(`http://localhost:5000/api/oders/editOrderStatus/${order_id}`, {
        _id: order_id, // Extract product ID from the product object
         // Use the provided user_id argument
      });
      console.log("data",response)
      // Check for successful response
      if (response.data.status === 1) {

        setSuccessMessage('Delete order!');
        toast.success('Delete order successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick:
            true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();

        // Keep the item added to the cart state
      } else {
        // Server-side addition failed, remove from cart state
        console.error("Server-side editqtyorder failed:", response.data.message);
      
        alert(`Error editqtyorder item to cart: ${response.data.message}`);  // More specific message
      }
    } catch (error) {
      console.error("Error editqtyorder item to cart:", error);
      alert("Error editqtyorder item to cart. Số lượng không thể giảm xuống 0.");
    }
  };
  

  // Stpe: 6
  const decreaseQty = (product) => {

    // if hamro product alredy cart xa bhane  find garna help garxa
    const productExit = CartItem.find((item) => item.id === product.id)

    // if product is exit and its qty is 1 then we will run a fun  setCartItem
    // inside  setCartItem we will run filter to check if item.id is match to product.id
    // if the item.id is doesnt match to product.id then that items are display in cart
    // else
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    } else {
      // if product is exit and qty  of that produt is not equal to 1
      // then will run function call setCartItem
      // inside setCartItem we will run map method
      // this map() will check if item.id match to produt.id  then we have to desc the qty of product by 1
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
        <Route path="/login" element={
            <>
            <Header CartItem={CartItem}/>
            <Login></Login>
              <Footer />
            </>
          } />

          <Route path="/" element={
            <>
              <Header CartItem={CartItem} />
              <Pages productItems={productItems} addToCart={addToCart} shopItems={shopItems} />
              <Footer />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Header CartItem={CartItem} />
              <Cart CartItem={CartItem} addToCart={addToCart} deleteToCart ={deleteToCart} check = {check} edit = {editqtyorder} decreaseQty={decreaseQty} />
              <Footer />
            </>
          } />

          <Route path="/pages" element={
        <>
        <Header CartItem={CartItem} />
        <Cart_Order CartItem={CartItem} addToCart={addToCart} deleteToCart ={deleteToCart} check = {check} edit = {editqtyorder} decreaseQty={decreaseQty} /> 
        <Footer />
      </>
          } />

      <Route path="/get_product/:id" element={
        <>
        <Header CartItem={CartItem} />
        <Product_Detail CartItem={CartItem} addToCart={addToCart} deleteToCart ={deleteToCart} check = {check} edit = {editqtyorder} decreaseQty={decreaseQty} /> 
        <Footer />
      </>
          } />

          <Route path="/user" element={
            <>
              <Header CartItem={CartItem} />

              <Footer />
            </>
          } />

          <Route path="/admin" element={
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar
                      setIsSidebar={setIsSidebar} />
                    <Outlet />
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>

          }>
            <Route index element={<Dashboard />} />
            <Route path="team" element={<Team />} />

            <Route path="users" element={<Contacts />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />

            <Route path="product" element={<Form />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="line" element={<Line />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="category" element={<Category />} />
            <Route path="categories" element={<Categories />} />
            <Route path="geography" element={<Geography />} />
          </Route>

        </Routes>
      </Router>





    </>
  )
}

export default App
