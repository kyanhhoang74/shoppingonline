
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from
  '@mui/material/MenuItem';
import axios from 'axios';
const Search = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose   
 = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');   

    localStorage.removeItem('_id');

    window.location.href = '/login';
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('_id');

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/oders/get_order_user/${userId}?status=0`);
        console.log("aaaaaaaa",response)

        if (response.status === 200) {
          setOrders(response.data.filter((order) => order.status === 0)); // Filter pending orders
        } else {
          console.error("Error fetching order count:", response.data);
        }
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    if (token) {
      setIsLoggedIn(true);
      setUserId(userId);
      fetchData(); // Fetch orders on login or user change
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [userId]); // Re-run useEffect when userId changes

  const totalQuantity = orders.reduce((acc, order) => acc + order.qty, 0)

  return (
    <>
      <section className={`search ${isSticky ? 'sticky-search' : ''}`}>
        <div className='container c_flex'>
          <div className='logo width '>
            <h1>NINETEAM</h1>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>
          <div className='icon f_flex width'>
            {isLoggedIn ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  color='warning'
                  style={{ marginTop: -4 }}
                >
                  <i className="fa fa-user icon-circle"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={"handleClose"}>Profile</MenuItem>
                  <MenuItem onClick={"handleClose"}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>

                </Menu>
                <div className='cart'>
                  <Link to='/cart'>
                    <i className='fa fa-shopping-bag icon-circle'></i>
                    <span>{totalQuantity === 0 ? "" : totalQuantity}</span>
                  </Link>

                </div>
              </>
            ) : (
              <Link to='/login'>
                <i className='fa fa-user icon-circle'></i>
              </Link>
            )}
            {/* ... other elements ... */}
          </div>


        </div>
      </section>
    </>
  )
}

export default Search
