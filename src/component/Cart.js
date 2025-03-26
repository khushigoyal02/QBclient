import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";


const Cart = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('userId');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => { fetchCartItems() }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUpdateQuantity = async (productId) => {
    try {
      await axios.put(`/api/v1/cart/${userId}/${productId}`, { quantity });
      window.location.reload();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/api/v1/cart/${userId}/${productId}`);
      window.location.reload();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const calculateTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const handlePlaceOrder = async () => {
    navigate('/shipping');
  }

  return (
    <div className="p-[100px]">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <RemoveShoppingCartIcon style={{ color: '#eb4034' }} className='text-6xl' />
          <h1 className="mt-4 text-xl">Your cart is currently empty</h1>
        </div>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-start border-b border-gray-300 py-4 mb-4">
                <div className="flex items-center">
                  <img src={item.imageurl} alt={item.name} className="h-24 w-24" />
                  <div className="ml-4">
                    <h4 className="font-light pt-1 pb-0 text-lg">{item.name}</h4>
                    <span className="font-bold">Price: ${calculateTotalPrice(item.price, item.quantity)}</span>
                    <br />
                    <button 
                      onClick={() => removeFromCart(item.productId)} 
                      className="mt-2 text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex flex-col items-start">
                  <p className="text-lg font-bold">Quantity: {item.quantity}</p>
                  <select 
                    value={quantity} 
                    onChange={handleQuantityChange} 
                    className="border border-gray-300 rounded p-2 mt-2">
                    {[...Array(10)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <button 
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                    onClick={() => handleUpdateQuantity(item.productId)}>
                    Update Quantity
                  </button>
                </div> 
              </li>
            ))}
          </ul>
          <div className='mt-10 flex items-center justify-center'>
            <button 
              onClick={handlePlaceOrder} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
