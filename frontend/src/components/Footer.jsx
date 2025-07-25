import { FaCopyright, FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className=' md:h-[210px] max-sm:h-[270px] '>
                <div className='flex flex-col mt-10 ml-10 '>
                    <div className='flex items-center sm:gap-4 md:gap-8'>
                        <div>
                            <h1 className='text-xl font-semibold'>JobPortal</h1>
                        </div>
                        <div className='flex flex-col gap-4' >
                            <div>
                                <h1 className='font-bold md:text-2xl'>Follow us on social media</h1>
                            </div>
                            <div className='flex gap-4 text-2xl'>
                                <a href="https://www.facebook.com" target='_blank' >

                                    <FaFacebook className='duration-100 transform hover:scale-125' />
                                </a>
                                <a href="https://www.linkedin.com " target='_blank'>

                                    <FaLinkedinIn className='duration-100 transform hover:scale-125' />
                                </a>
                                <a href="https://www.twitter.com" target='_blank'>

                                    <FaTwitter className='duration-100 transform hover:scale-125' />
                                </a>
                                <a href="https://www.instagram.com" target='_blank'>

                                    <FaInstagram className='duration-100 transform hover:scale-125' />
                                </a>
                                <a href="https://www.youtube.com" target='_blank'>

                                    <FaYoutube className='duration-100 transform hover:scale-125' />
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className=' divider'></div>
                    <div className='flex items-center gap-4 font-semibold'>
                        <p className='flex items-center gap-1'><FaCopyright /> 2025 | All rights reserved</p>
                        <Link to='about' className='link'>About Us</Link>
                        <Link to='/privacy' className="link">Privacy policy</Link>
                        <Link to='terms' className="link">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='w-full h-1 bg-[#2BB793]'></div>
                <div className='w-full h-1 bg-[#83BDE4]'></div>
                <div className='w-full h-1 bg-[#FFD166]'></div>
            </div>
        </>

    )
}

export default Footer