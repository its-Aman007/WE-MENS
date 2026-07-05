import React from 'react'
import assets from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap text-center py-20 text-xs sm:text-sm md:text-base text-gray'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='mt-2'>Hassel free exchange policy on all orders.</p>
        </div>

        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>7 Days Return Policy</p>
            <p className='mt-2'> We Provide 7 days easy Return policy on all orders.</p>
        </div>

        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Customer Support</p>
            <p className='mt-2'>24/7 customer support for all your needs.</p>
        </div>
      
    </div>
  )
}

export default OurPolicy
