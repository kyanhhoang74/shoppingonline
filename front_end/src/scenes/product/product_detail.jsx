import React, { useState, useEffect } from "react"
import "./style.css"
import axios from "axios";
const ProductDetail = ({ addToCart }) => {
  // State to store fetched orders (if not passed as props)
  const [products, setProducts] = useState([]);

  // State to calculate total price
  const userId = localStorage.getItem('_id');
  const currentUrl = window.location.href;
  const productIdRegex = /\/get_product\/([a-fA-F0-9]+)/;
  const match = productIdRegex.exec(currentUrl);
  const productId = match[1];


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/get_product/${productId}`);

        if (response.status === 200) {
          const filename = response.data.image_preview?.match(/[^\\\/]+$/)[0] || '';
          const desiredPath = filename;
          const processedProduct = {
            ...response.data,
            image_preview: desiredPath, // Convert to string for consistent type
          };
          // Extract filename (optional)


          setProducts(processedProduct);

          // Calculate total price (if applicable)
          // setTotalPrice(processedProduct.qty * processedProduct.order_price); // Assuming price per product
        } else {
          console.error("Error fetching product:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <section className='cart-items'>
        <h1 style={{ padding: 10, color: "red", marginLeft: 100 }}>My Ordered</h1>
        <div className='container d_flex'>
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className='cart-details'>

            {/* yasma hami le cart item lai display garaaxa */}

            <div className='cart-list product d_flex' >
                  <div className=''>
                  <img src={`/images/shops/${products.image_preview}`} alt="" />             
                  </div>
                  <div className='cart-details'>
                    <h1>{products.product_name}</h1>
                    <h4>
                      Description: {products.description}
                    </h4>
                    <h4>Stock: {products.stock}</h4>
                    <h4>Price: {products.price}</h4>
                
                  </div>
                  <div className='cartControl d_flex'>
                  {userId && 
                             <button className='incCart' onClick={() => addToCart(products, userId)}>
                             <i className='fa-solid fa-plus'></i>
                           </button>
                  }
             

                  
             </div>
     
                </div>





          </div>


        </div>
      </section>
    </>
  )
}

export default ProductDetail
