/*import {React, useState, useEffect} from 'react';
import './Home.css';
import Profile from '../User/Profile.js';

const Home = () => {
  const [profile, showProfile]=useState(false);
  const userId=localStorage.getItem('userId');

  useEffect(()=>{
    if (userId) showProfile(true);
  }, [])

  return (
    <>
    <div className="banner row">
      <div className='col-md-11 main'> <h1>Welcome to QuickBuy</h1> </div>
      <div className='col-md-1 pt-5'> { profile && <Profile/> } </div>
    </div>
    </>
  )
}

export default Home*/

import { React, useState, useEffect } from 'react';
import Profile from './User/Profile.js';

const Home = () => {
  const [profile, showProfile] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) showProfile(true);
  }, [userId]);

  return (
    <>
      <div className="flex items-center justify-center text-white w-full bg-black" style={{ backgroundImage: "url('../../images/cover.jfif')", backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '90vh'}}>
        <div className="flex flex-col items-center justify-center w-11/12">
          <h1 className="font-roboto font-semibold text-6xl">Welcome to QuickBuy</h1>
        </div>
        <div className="w-1/12">
          {profile && <Profile />}
        </div>
      </div>
    </>
  );
}

export default Home;

