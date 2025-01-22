import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <div className="h-6 transition-transform duration-300 hover:scale-150 mb-5 mt-5">
            <p>
              <span className='text-green-700'>joyful</span>
              <span className='text-blue-700'>crystals</span>
            </p>
          </div>
            <p className='w-full md:w-2/3 text-gray-800'>
                Purchase your favorite crystals for the lowest prices in the market. We offer a wide range of crystals and deliver them right to your doorstep!
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>HOME</li>
                <li>DELIVERY</li>
                <li>PRIVACY POLICY</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>DUMMY XIAO HONG SHU USERNAME HERE</li>
                <li>DUMMY WECHAT HERE</li>
            </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ joyfulcrystal.com - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
