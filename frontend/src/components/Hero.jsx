import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='relative flex flex-col sm:flex-row justify-center items-center py-20'>
      {/* Cascaded pastel pink background with wobble animation */}
      <div className='absolute inset-0 bg-pink-200 rounded-lg opacity-80 -z-10 transform -translate-x-4 -translate-y-4 mt-4' />


      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex flex-col items-center justify-center gap-6'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>WELCOME TO</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-center'>
            JOYFULKOKO
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-medium text-sm md:text-base'>WELCOME TO</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2 rounded-xl' src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero
