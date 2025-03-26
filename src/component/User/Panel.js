import {React, useEffect, useState} from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ProductIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom';

const Panel = () => {
  const [isAdmin, setIsAdmin]=useState(false);
  const role=localStorage.getItem('role');
  
  useEffect(()=>{
    if (role=='Admin') setIsAdmin(true);
  }, [])

    return (
      <div>
        <ul style={{
            listStyle: 'none',
            marginTop: '10px',
        }}>
          <li className='my-1'><Link to="/cart-items"><ShoppingCartIcon fontSize="medium" /></Link></li>
          <li className='my-1'><Link to="/profile"><PersonIcon fontSize="medium" /></Link></li>
          <li className='my-1'><Link to="/my-orders"><ListAltIcon fontSize="medium" /></Link></li>
          {isAdmin ? (
            <>
            <li className='my-1'><Link to="/all-products"><ProductIcon fontSize="medium" /></Link></li>
            <li className='my-1'><Link to="/users"><PeopleIcon fontSize="medium" /></Link></li>
            <li className='my-1'><Link to="/all-orders"><NoteAddIcon fontSize="medium" /></Link></li>
            </>
          ): (
            <></>
          )}
        </ul>
      </div>
    );
  };

export default Panel
