import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null); // State for profile picture
    const navigate = useNavigate();
    const [action, setAction] = useState("Login");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/v1/login`, { email, password });
            const { userId, role } = response.data;
            // Store the userId in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            navigate('/');
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'Invalid Credentials') alert(err.response.data.message);
            console.error('Error logging in:', err);
        }
    };

    const handleSignup = async () => {
        const formData = new FormData(); // Create FormData object for file upload
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('profilePic', profilePic); // Append profile picture

        try {
            const response = await axios.post('/api/v1/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { userId, role } = response.data;
            // Store the userId in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('role', role);
            navigate('/');
            window.location.reload();
        } catch (err) {
            if (err.response && err.response.data.message === 'All fields must be filled') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'Email is not valid') alert(err.response.data.message);
            if (err.response && err.response.data.message === 'User already exists') alert(err.response.data.message);
            console.error('Error signing up:', err);
        }
    };

    const callonclick = () => {
        action === "Login" ? handleLogin() : handleSignup();
    };

    const clear = () => {
        setAction(action === "Login" ? "Register" : "Login");
        if (action === "Login") {
            setName("");
        }
        setEmail("");
        setPassword("");
        setProfilePic(null); // Clear profile picture
    };

    return (
        <div className='bg-gray-100 p-6 rounded-lg shadow-md w-1/2 mx-auto mt-24'>
            <h2 className="text-center text-gray-800 text-3xl font-medium mb-4">{action}</h2>
            
            {action === "Login" ? null : (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded mb-4"
                />
            )}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4"
            />
            
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4"
            />
            
            {action === "Register" && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])} // Set the profile picture
                    className="mb-4"
                />
            )}

            <button 
                onClick={callonclick} 
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">
                {action}
            </button>

            {action === "Login" ? (
                <div className="text-center mt-3">
                    <span>Don't have an account?</span>
                    <button 
                        className="text-blue-500 underline ml-1" 
                        onClick={clear}>
                        Register
                    </button>
                </div>
            ) : (
                <div className="text-center mt-3">
                    <span>Already have an account?</span>
                    <button 
                        className="text-blue-500 underline ml-1" 
                        onClick={clear}>
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default Form;