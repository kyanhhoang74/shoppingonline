import React, { useState, useEffect } from "react";
import axios from "axios"; 
const Catg = () => {
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState(null); // State to handle errors

  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get("http://localhost:5000/api/categories/all_categories"); // Make API call
        setCategories(response.data); // Update state with fetched categories
      } catch (error) {
        setError(error); // Set error state if request fails
      } 
    };

    fetchData();
  }, []); // Empty dependency array ensures fetching only once

  // Display categories conditionally based on loading state and error
  return (
    <>
      <div className='category'>
        <div className='chead d_flex'>
          <h1>Brands </h1>
          <h1>Shops </h1>
        </div>
        {categories.map((value, index) => {
          return (
            <div className='box f_flex' key={index}>
              <span>{value.name}</span>
            </div>
          )
        })}
        <div className='box box2'>
          <button>View All Brands</button>
        </div>
      </div>
    </>
  )
}

export default Catg
