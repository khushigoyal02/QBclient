import React from 'react';
import appstore from '../images/appstore.png';
import playstore from '../images/playstore.png';

const Footer = () => {
  return (
    <div className="flex items-center bg-gray-900 text-white sm:flex-row">
      <div className="w-1/5 flex flex-col items-center">
        <h4 className="font-roboto text-base">DOWNLOAD OUR APP</h4>
        <p className="text-center text-lg font-sans">Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="Play Store" className="w-24 my-2 cursor-pointer" />
        <img src={appstore} alt="App Store" className="w-24 my-2 cursor-pointer" />
      </div>

      <div className="w-3/5 text-center">
        <h1 className="text-[5vmax] font-bold text-[#eb4034] font-roboto">QUICKBUY.</h1>
        <p className="max-w-xl mx-auto font-sans my-7">High Quality is our first priority</p>
      </div>

      <div className="w-1/5 flex flex-col items-center">
        <h4 className="font-roboto text-lg underline">Follow Us</h4>
        <a href="https://in.linkedin.com" className="text-lg font-sans text-white hover:text-[#eb4034] transition duration-500 my-2">LinkedIn</a>
        <a href="https://www.instagram.com" className="text-lg font-sans text-white hover:text-[#eb4034] transition duration-500 my-2">Instagram</a>
        <a href="https://www.facebook.com" className="text-lg font-sans text-white hover:text-[#eb4034] transition duration-500 my-2">Facebook</a>
      </div>
    </div>
  );
}

export default Footer;