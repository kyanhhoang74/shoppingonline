import React, {useState, useEffect} from "react"
import axios from 'axios';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userID = localStorage.getItem('_id')
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all_products'); // Replace with your actual API endpoint

        const processedProducts = response.data.map((product) => {
          const imagePath = product.image_preview?.toString(); // Convert to string for consistent type
          const filename = imagePath?.match(/[^\\\/]+$/)[0] || '';
          const desiredPath = filename; // Construct desired path

          return { ...product, image_preview: desiredPath }; // Create a new product object with updated image path
        });
        setProducts(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(count + 1)
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  }
  return (
    <>
      <div className='content grid product'>
        {products.map((val, index) => {
          return (
            <div className='box' key={index}>
                {val.status === 3 &&      <>
              <div className='img'>
              <img style={{height: 270, width: 277}} src={`/images/shops/${val.image_preview}`} alt='' />
              </div>
              <h4>{val.products_name}</h4>
              <span>${val.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 })}</span>
              </>}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Cart
