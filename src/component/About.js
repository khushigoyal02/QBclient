import React from 'react';
import profile from '../images/AboutPic.jpeg';

const About = () => {
  return (
    <div className="text-center p-[100px]">
      <h2 className="text-red-600 text-3xl my-4">About Us</h2>
      <div class="flex items-center justify-center">
      <img src={profile} alt="Profile" className="h-24 w-24 rounded-full" />
      </div>
      <h4 className="mt-3 text-xl">Khushi Goyal</h4>
      <h5 className="text-lg">Full Stack Developer</h5>
    </div>
  );
}

export default About;

