import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from 'axios';

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}



const FlashCard = ({ addToCart }) => {
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
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <>
      <Slider {...settings}>
        {products.map((productItems) => {
          return (

            <div className='box'>
              {productItems.status === 1 &&
                <div className='product mtop'>
                  <div className='img'>
                    <span className='discount'>{productItems.price_sale}% Off</span>
                    <img style={{ width: 277, height: 270 }} src={`/images/shops/${productItems.image_preview}`} alt="" />
                    <div className='product-like'>
                      <label>{count}</label> <br />
                      <i className='fa-regular fa-heart' onClick={increment}></i>
                    </div>
                  </div>
                  <div className='product-details'>
                    <h3>{productItems.name}</h3>
                    <div className='rate'>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                      <i className='fa fa-star'></i>
                    </div>
                    <div className='price'>
                      <h4>Sale: {(productItems.price  - (productItems.price * (productItems.price_sale/100))).toLocaleString('vi-VN', { minimumFractionDigits: 0 })} </h4>
                      <h4 style={{color:"grey"}}>{productItems.price.toLocaleString('vi-VN', { minimumFractionDigits: 0 })} </h4>
                      {/* step : 3  
                     if hami le button ma click garryo bahne 
                    */}
                    {userID &&
                      <button onClick={() => addToCart(productItems, userID)}>
                        <i className='fa fa-plus'></i>
                      </button>
        }
                    </div>
                  </div>
                </div>
              }
            </div>

          )
        })}
      </Slider>
    </>
  )
}

export default FlashCard
