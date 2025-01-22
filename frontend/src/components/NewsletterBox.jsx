import React from 'react'

const NewsletterBox = () => {
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-grray-400 mt-3'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.
      </p>
      <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
        <button type='submit' className='bg-black text-white text-xs px-100 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
