import React, {useState, useEffect} from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import axios from 'axios';

const TopCart = () => {
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
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  }
  return (
    <>
      <Slider {...settings}>
        {products.map((value, index) => {
          return (
            <>
              <div className='box product' key={index}>
              {value.status === 4 &&      <>
                <div className='nametop d_flex'>
                  <span className='tleft'>{value.product_name}</span>
            
                </div>
                <div className='img'>
                <img style={{width: 277, height: 270}} src={`/images/shops/${value.image_preview}`} alt='' />
                </div>
                </>}
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default TopCart
