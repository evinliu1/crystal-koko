import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <div className="h-6 mb-5 mt-5">
            <p>
              <span className='text-green-700'>crystal</span>
              <span className='text-blue-700'>koko</span>
            </p>
          </div>
            <p className='w-full md:w-2/3 text-gray-800'>
                Purchase your favorite crystals for the lowest prices in the market. We offer a wide range of crystals and deliver them right to your doorstep!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>Quick Nav</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
            <NavLink to="/" className="">
                <p className="text-xl">Home</p>
                </NavLink>
                <NavLink to="/orders" className="">
                <p className="text-xl">Orders</p>
                </NavLink>
                <NavLink to="/profile" className="">
                <p className="text-xl">Profile</p>
                </NavLink>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Find my XHS @ 苹果er</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>&copy; 2025 crystalkoko.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
