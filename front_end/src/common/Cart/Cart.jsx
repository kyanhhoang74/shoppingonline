import React, {useState, useEffect} from "react"
import "./style.css"
import axios from "axios"; 
const Cart = ({ addToCart, deleteToCart , edit, check }) => {
  // State to store fetched orders (if not passed as props)
  const [orders, setOrders] = useState([]);

  // State to calculate total price
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem('_id');
  const newTotalPrice = orders.reduce((acc, order) => acc + order.qty * order.order_price, 0);
  useEffect(() => {

    const fetchCartItems = async () => {
      if (userId) { // Check for userId if not passed as props
        try {
          const response = await axios.get(`http://localhost:5000/api/oders/get_order_user/${userId}?status=0`);
          const processedProducts = response.data.map((product) => {
            const imagePath = product.product.image_preview?.toString(); // Convert to string for consistent type
            const filename = imagePath?.match(/[^\\\/]+$/)[0] || '';
            const desiredPath =  filename; // Construct desired path


  
            return { ...product, image_preview: desiredPath }; // Create a new product object with updated image path
            
            
          });
          setOrders(processedProducts);
          console.log("response",orders)


          if (response.status === 200) {
            setOrders(processedProducts.filter((order) => order.status === 0)); // Filter pending orders
            calculateTotalPrice(); // Update total price
          } else {
            console.error("Error fetching orders:", response.data);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    

    fetchCartItems();
  }, [userId]); // Re-run useEffect when userId changes
  console.log("test",orders)
  const calculateTotalPrice = () => {
    const newTotalPrice = orders.reduce((acc, order) => acc + order.qty * order.order_price, 0);
    setTotalPrice(newTotalPrice);
  };
  
  return (
    <>
      <section className='cart-items'>
        <div className='container d_flex'>
          {/* if hamro cart ma kunai pani item xaina bhane no diplay */}

          <div className='cart-details'>
            {orders.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

            {/* yasma hami le cart item lai display garaaxa */}
            {orders.map((item) => {
              const productQty = item.order_price * item.qty

              return (
                <>
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                  <img src={`/images/shops/${item.image_preview}`} alt="" />             
                  </div>
                  <div className='cart-details'>
                    <h3>{item.product.product_name}</h3>
                    <h4>
                      {item.order_price.toLocaleString('vi-VN', { minimumFractionDigits: 0 })} * {item.qty}
                      <span>{productQty.toLocaleString('vi-VN', { minimumFractionDigits: 0 })}</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart' onClick={() => deleteToCart(item.order_id)}> 
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
             
                    <div className='cartControl d_flex'>
                    <button className='incCart' onClick={() => edit(item.order_id,item.product._id, userId)}>
                      <i class="fa-solid fa-minus"></i>
                      </button>
                      <button className='incCart' onClick={() => addToCart(item.product, userId)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='incCart' onClick={() => check(item.order_id)}>
                      <i class="fa-solid fa-check"></i>
                      </button>
                    </div>
                    
                    
                  </div>
                  

     
                </div>
                
                </>
                
              )
            })}
          </div>

          <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              <h3>{newTotalPrice.toLocaleString('vi-VN', { minimumFractionDigits: 0 })}</h3>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Cart
