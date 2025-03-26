import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  isHalf: true
}

function ProductList() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => { fetchProducts() }, []);

  return (
    <div className="p-[100px]">
      <h1 className="text-center text-gray-600 text-3xl font-medium border-b border-gray-300 mb-4 pb-2">Products</h1>
      <div className="flex flex-wrap justify-center min-h-[30vh]">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id} className="flex flex-col text-gray-800 m-2 transition-transform duration-500 hover:shadow-lg hover:-translate-y-5 p-2 w-[14vmax]">
            <img src={product.imageurl} alt={product.name} className="w-[13vmax] h-[12vmax]" />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <ReactStars {...options} value={product.rating} />
            <span className="text-red-600 font-bold text-xl font-sans">{`$${product.price}`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

