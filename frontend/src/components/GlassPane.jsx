import React from 'react'

const GlassPane = () => {

  return (
    <div className='absolute flex flex-col justify-center items-center min-h-screen max-w-screen-lg mx-auto px-8 z-0'>

      <div className='fixed inset-0 pointer-events-none -z-10 flex justify-center'>
        <div className='relative w-full max-w-screen-xl h-full px-12'>
          <div className='absolute inset-0 bg-white bg-opacity-20 backdrop-blur-md rounded-lg ' />
        </div>

      </div>
    </div>
  )
}

export default GlassPane;
