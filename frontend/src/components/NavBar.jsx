import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import { setUser } from '../redux/authSlice';
import { MdEmail } from 'react-icons/md';
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx';

const NavBar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const sendVerificationOtp = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/send-verification-otp`, {}, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.message)
                navigate('/email-verify')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="flex items-center shadow-sm max-sm:p-2 md:pr-10 md:pl-10 navbar bg-base-100">

            <div className='sm:navbar-start sm:hidden'>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="md:hidden btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52">

                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to='/recruiter/companies' className='text-lg font-semibold'>companies</Link></li>
                                    <li><Link to='/recruiter/jobs' className='text-lg font-semibold'>Jobs</Link></li>
                                    <li>
                                        {
                                            user && user.role === 'recruiter' && (
                                                <div className='' >
                                                    <Link to='/recruiter/dashboard' className='flex items-center gap-2'>
                                                        <AiOutlineUser /> View Dashboard
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    </li>
                                </>
                            ) : (<>
                                <li className=''>
                                    <Link to='/' className='text-lg font-semibold'>
                                        Home
                                    </Link>
                                </li>
                                <li><Link to='/jobs' className='text-lg font-semibold'>Jobs</Link></li>
                                <li><Link to='/browse' className='text-lg font-semibold'>Browse</Link></li>
                            </>)
                        }
                    </ul>
                </div>
            </div>
            <div className="flex-1">
                <Link to='/' className='text-lg font-semibold '>JobPortal</Link>
            </div>
            <div className="flex-3 max-sm:hidden">
                <ul className="px-1 menu menu-horizontal">

                    {
                        user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to='/recruiter/companies' className='text-lg font-semibold '>Companies</Link></li>
                                <li><Link to='/recruiter/jobs' className='text-lg font-semibold'>Jobs</Link></li>
                            </>
                        ) : (<>
                            <li className=''>
                                <Link to='/' className='text-lg font-semibold'>
                                    Home
                                </Link>
                            </li>

                            <li><Link to='/jobs' className='text-lg font-semibold'>Jobs</Link></li>
                            <li><Link to='/browse' className='text-lg font-semibold'>Browse</Link></li>
                        </>)
                    }
                </ul>
            </div>


            <div className='flex items-center gap-3'>
                <div>
                    {
                        user ?
                            <div className='flex items-center gap-3'>
                                {
                                    user && user.role === 'candidate' && <Link to='/job-history' className='font-semibold md:text-lg'>Job History</Link>
                                }

                                {
                                    user && user.role === 'recruiter' && (
                                        <div className='' >
                                            <Link to='/recruiter/dashboard' className='flex items-center gap-2 text-xl'>
                                                <AiOutlineUser /> View Dashboard
                                            </Link>
                                        </div>
                                    )
                                }

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-circle">
                                        <div className="rounded-full avatar ">
                                            <picture>
                                                <img
                                                    alt="Tailwind CSS Navbar component"
                                                    src={user?.profile?.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} className='rounded-full' />
                                            </picture>
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="p-2 mt-3 text-xl shadow menu sm:menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52 md:w-62">
                                        <li>
                                            <p className="justify-between">
                                                {user?.fullname || user?.name}
                                            </p>

                                        </li>
                                        {
                                            user && user.role === 'candidate' && (
                                                <li >
                                                    <Link to='/profile' className='text-xl'>
                                                        <AiOutlineUser /> View Profile
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        <li >
                                            {user?.isAccountVerified === false && <button className='text-xl' onClick={sendVerificationOtp}> <span> <MdEmail /></span>Verify Email</button>}
                                        </li>

                                        {
                                            user && user.role === 'admin' && (
                                                <li >
                                                    <Link to='/admin/dashboard' className='text-xl'>
                                                        <AiOutlineUser /> Admin Dashboard
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        <li ><a className='text-xl' onClick={handleLogout}> <IoIosLogOut />Logout</a></li>
                                    </ul>
                                </div>
                            </div> :
                            <div>
                                <div className='flex items-center gap-4 p-2'>
                                    <div>
                                        <button className="ont-semibold  text-[#1F8268]" onClick={() => document.getElementById('signup_model').showModal()}>SignUp</button>
                                        <dialog id="signup_model" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                                                </form>
                                                <Signup />
                                            </div>
                                        </dialog>
                                    </div>
                                    <div>
                                        <button className="btn max-sm:btn-sm bg-[#1F8268] hover:bg-white hover:border-[#1F8268] hover:text-[#1F8268]" onClick={() => document.getElementById('login_modal').showModal()}>Login</button>
                                        <dialog id="login_modal" className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                                                </form>
                                                <Login />
                                            </div>
                                        </dialog>
                                    </div>

                                </div>
                            </div>
                    }
                </div>
                <div>
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="light" />

                        {/* sun icon */}
                        <svg
                            className="w-8 h-8 fill-current swap-off"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        

                        {/* moon icon */}
                        <svg
                            className="w-8 h-8 fill-current swap-on"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>



        </div>
    )
}

export default NavBar