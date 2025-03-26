import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from "react-rating-stars-component";

const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    isHalf: true
}

const ProductDetails = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const addToCart = async () => {
        if (!userId) {
            alert('Please log in to add the cart.');
            navigate('/login');
        }

        try {
            const response = await axios.post('/api/v1/add-to-cart', {
                userId,
                productId: product._id,
                imageurl: product.imageurl,
                name: product.name,
                price: product.price,
                quantity: 1,
            });

            if (response.status === 200) {
                alert("Product added to cart successfully");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => { fetchProduct() }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-[100px] w-full flex flex-col md:flex-row">
            <div className='md:w-1/2'>
                <img className='h-[80vmin] w-[80vmin]' src={product.imageurl} alt={product.name} />
            </div>

            <div className='md:w-1/2 flex flex-col justify-between'>
                <div className="text-gray-800 font-semibold text-[1.6vmax] py-[1.5vmax]">
                    <h2 className="text-left text-[2vmax]">{product.name}</h2>
                </div>
                <div className="border-t border-b border-gray-300 w-7/12 py-[1.5vmax]">
                    <RatingStars {...options} value={product.rating} />
                </div>
                <div className="w-7/12 text-gray-700 font-semibold text-[1.5vmax] my-[2vmax]">
                    <h2 className="text-left text-[2vmax]">{`$${product.price}`}</h2>
                    <button 
                        disabled={product.stock === 0} 
                        onClick={addToCart} 
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Add to Cart
                    </button>
                </div>
                <div>
                    Status:
                    {product.stock > 0 ? (
                        <span className='text-green-500 font-bold'> In Stock</span>
                    ) : (
                        <span className='text-red-500 font-bold'> Out of Stock</span>
                    )}
                </div>
                <div className="text-gray-600 font-sans text-[1vmax] border-t border-gray-300 py-[2vmax]">
                    Description: <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;