import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: '',
    });
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <div className='flex items-center justify-center min-h-screen '>

                <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">

                    <div className="card-body">
                        <h1 className='text-xl text-center'>Login</h1>
                        <form onSubmit={submitHandler} className='flex flex-col gap-3 '>
                            <div className="fieldset">

                                <div>
                                    <label className="label">Email</label>
                                    <input type="email"
                                        name='email'
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="input" placeholder="user@email.com" />
                                </div>

                                <div>
                                    <label className="label">Password</label>
                                    <input type="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        name='password' className="input" placeholder="Password" />
                                </div>

                                <div className='flex items-center gap-2 mt-2'>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="radio"
                                            name="role"
                                            value='candidate' className="radio"
                                            checked={input.role === 'candidate'}
                                            onChange={changeEventHandler}
                                        />
                                        <p>Candidate</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input type="radio" name="role" value='recruiter'
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="radio" />
                                        <p>Recruiter</p>
                                    </div>
                                </div>

                                <Link to='/reset-password' className='mt-2'>
                                    <span className='link link-primary'>Forget Password?</span>
                                </Link>

                            </div>
                            {loading ? <button className='mt-2 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                                <button type='submit' className="mt-2 btn btn-neutral">Login</button>
                            }
                            <span>Create a new account? <Link to='/signup'>Sign Up</Link></span>
                        </form>
                    </div>
                </div>
            </div></div>
    )
}

export default Login