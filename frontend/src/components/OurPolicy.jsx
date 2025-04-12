import React from 'react'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src="assets.exchange_icon" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Supply and Demand</p>
            <p className='text-gray-500'>Each crystal or bracelet is unique!</p>
        </div>
        <div>
            <img src="assets.quality_icon" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Watch our live!</p>
            <p className='text-gray-500'>Watch us live @ 苹果er</p>
        </div>
        <div>
            <img src="assets.support_img" className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Customer Support</p>
            <p className='text-gray-500'>We provide customer support within ~1 day</p>
        </div>
    </div>
  )
}

export default OurPolicy
