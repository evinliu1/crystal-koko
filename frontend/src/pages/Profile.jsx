import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Profile = () => {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Main Content */}
      <div className="my-10 flex flex-col-reverse justify-center md:flex-row gap-12 px-6 md:px-20 lg:px-40">
        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-6 p-8 rounded-lg relative">
          <div className="absolute inset-0 rounded-lg opacity-60 -z-10"></div>
          <h2 className="font-bold text-3xl text-gray-700">Oops - Nothing here yet</h2>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            className="w-full h-auto md:max-w-[480px]"
            src={assets.oops}
            alt="Contact Us"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
