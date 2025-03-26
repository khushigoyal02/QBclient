import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem('userId'); // Get user ID from local storage

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/v1/user-orders/${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.log(err);
            } 
        };

        fetchOrders();
    }, [userId]);

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    return (
        <div className="p-[100px]">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order._id} className="border-b border-gray-300 py-4">
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.productId} className="flex items-center justify-between mb-2">
                                        <div>
                                            <h5 className="text-lg text-gray-700">{item.name}</h5>
                                            <h6 className="text-gray-600">
                                                Quantity: {item.quantity} &nbsp;&nbsp;&nbsp; Price: ${calculateTotalPrice(item.price, item.quantity)}
                                            </h6>
                                        </div>
                                        <div>
                                            <img className="h-24 w-24 object-cover" src={item.imageurl} alt={item.name} />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <b className="text-red-600">Total Amount: ${order.amount}</b>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrders;