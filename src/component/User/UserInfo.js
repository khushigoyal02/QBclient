import { React, useState, useEffect } from 'react';
import axios from 'axios';
import DefaultPic from "../../images/DefaultPic.jpg";

const UserInfo = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/user/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    }

    useEffect(() => { fetchUser() }, [])

    return (
        <div className="p-3">
            {user ? (
                <div className="p-[100px]">
                    <h1 className="text-center text-gray-600 font-medium text-2xl mb-4">MY PROFILE</h1>
                    <div className='flex flex-col md:flex-row'>
                    <div className="flex justify-center items-center md:w-1/2">
                        <img
                            src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : DefaultPic}
                            alt="Profile"
                            className="w-[20vmax] h-[20vmax] rounded-full"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <div className="m-5">
                            <h4 className="text-black font-normal text-xl">Full Name</h4>
                            <p className="text-gray-600 font-normal text-lg">{user.name}</p>
                        </div>
                        <div className="m-5">
                            <h4 className="text-black font-normal text-xl">Email</h4>
                            <p className="text-gray-600 font-normal text-lg">{user.email}</p>
                        </div>
                        <div className="m-5">
                            <h4 className="text-black font-normal text-xl">Joined On</h4>
                            <p className="text-gray-600 font-normal text-lg">{String(user.createdAt.substr(0, 10))}</p>
                        </div>
                    </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default UserInfo;