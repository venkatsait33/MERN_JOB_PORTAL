import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { MdFileDownload } from 'react-icons/md'

const PlayStoreApp = () => {
  return (
      <div className='bg-white max-sm:p-4 md:p-8 '>

          <div className='bg-[#F9F4FF] text-[#662194] flex items-center justify-center border rounded-l-2xl md:w-[80%] mx-auto md:h-[350px] md:gap-12 p-2 max-sm:h-[170px] '>
              <div>
                  <h1 className='font-bold md:text-3xl'>Download app!</h1>
                  <div className='gap-2 mt-2 lg:flex max-md:flex-col max-sm:flex-col max-sm:text-sm'>
                      <p>Unlimited job applications | </p>
                      <p>HRs contact you directly | </p>
                      <p>Track your Applications</p>
                  </div>
              </div>
              <div className=''>
                  <img src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/apna-app.png"
                      loading='lazy' className='md:h-[200px] max-sm:h-[100px]' alt="" />
              </div>
              <div>
                  <div>
                      <p className='flex items-center gap-1 font-semibold md:text-2xl'> <span className=' text-[#FFD166]'>
                          <FaStar />
                      </span>4.4</p>
                      <p>5L reviews</p>
                  </div>
                  <div>
                      <p className='flex items-center gap-1 font-semibold md:text-2xl'><span>
                          <MdFileDownload />
                      </span>1 cr+</p>
                      <p>App downloads</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default PlayStoreApp