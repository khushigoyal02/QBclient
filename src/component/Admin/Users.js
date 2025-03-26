/*import {React, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Users = () => {
    const [users, setUsers] = useState([]);
    const navigate=useNavigate();

    const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    };

  useEffect(()=>{ fetchUsers() },[])

  const deleteUser = async(userId) => {
    try {
      await axios.delete(`/api/v1/user/${userId}`);
    } catch(error) {
      console.log('Error deleting user:', error);
    }
  }

  const editUser=async(userId)=>{
    navigate(`/edit-user/${userId}`);
  }

  return (
    <div>
      <h1 className='text-center admin-heading'>ALL USERS</h1>
      <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td><EditIcon onClick={() => editUser(user._id)} /> <DeleteIcon onClick={() => deleteUser(user._id)} /></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default Users;*/

import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Users = () => {
  const API_URL = process.env.REACT_APP_API_URL;
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/v1/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => { fetchUsers() }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`/api/v1/user/${userId}`);
            setUsers(users.filter(user => user._id !== userId)); // Update the state to remove the deleted user
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    }

    const editUser = async (userId) => {
        navigate(`/edit-user/${userId}`);
    }

    return (
        <div className="p-6">
            <h1 className="text-center text-2xl font-medium text-gray-600 mb-4">ALL USERS</h1>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Role</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">{user.name}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">{user.role}</td>
                            <td className="border border-gray-300 p-2 flex space-x-2">
                                <EditIcon onClick={() => editUser(user._id)} className="cursor-pointer text-blue-500" />
                                <DeleteIcon onClick={() => deleteUser(user._id)} className="cursor-pointer text-red-600" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users;