import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const Products = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => { fetchProducts() }, []);

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/v1/products/${productId}`);
            // Optionally refresh the product list
            setProducts(products.filter(item => item._id !== productId));
        } catch (error) {
            console.log('Error deleting product:', error);
        }
    }

    const handleAddProduct = async () => {
        navigate('/add-product');
    }

    const editProduct = async (productId) => {
        navigate(`/edit-product/${productId}`);
    }

    return (
        <div className="p-[100px]">
            <h1 className="text-center text-2xl font-normal text-gray-600 mb-4">ALL PRODUCTS</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-red-600 text-white">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Stock</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{product.stock}</td>
                            <td className="border border-gray-300 p-2">${product.price}</td>
                            <td className="border border-gray-300 p-2 flex space-x-2">
                                <EditIcon onClick={() => editProduct(product._id)} className="cursor-pointer" />
                                <DeleteIcon onClick={() => deleteProduct(product._id)} className="cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handleAddProduct} 
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    <AddIcon style={{ color: '#fff' }} /> 
                    <span className='ml-2'>Add</span>
                </button>
            </div>
        </div>
    )
}

export default Products;