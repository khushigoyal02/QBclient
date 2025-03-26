import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Your backend URL

const ContactUs = () => {
    const [contact, setContact] = useState({ name: '', email: '', message: '' });
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        });
        alert("Message sent successfully.");
        setContact({ name: '', email: '', message: '' }); // Reset form
    };

    const sendMessage = () => {
        if (inputMessage.trim()) {
            socket.emit('sendMessage', inputMessage);
            setInputMessage('');
        }
    };

    // Listen for incoming messages from WebSocket server
    socket.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    return (
        <div className="p-[100px]">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    value={contact.name} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={contact.email} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    value={contact.message} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Send Message</button>
            </form>

            <h3>Live Chat</h3>
            <div className="chat-window">
                <div className="messages">
                    {messages.map((msg, index) => (
                        <p key={index}>{msg}</p>
                    ))}
                </div>
                <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    placeholder="Type your message..." 
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ContactUs;