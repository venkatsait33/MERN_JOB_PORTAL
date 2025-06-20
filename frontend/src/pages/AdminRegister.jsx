import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';

const AdminRegister = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        //we append all data into formdata with files
          
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/admin`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );

            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div> <div className='flex items-center justify-center min-h-screen '>
            <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">

                <div className="card-body">
                    <h1>Sign Up</h1>
                    <form onSubmit={submitHandler} className='flex flex-col gap-3 '>
                        <div className="fieldset">
                            <div>
                                <label className="label">User Name</label>
                                <input type="text" name='fullname' className="input"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    placeholder="User Name" />
                            </div>
                            <div>
                                <label className="label">Email</label>
                                <input type="email"
                                    name='email'
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="input" placeholder="user@email.com" />
                            </div>
                            <div>
                                <label className="label">Phone Number</label>
                                <input type="number"
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="input" placeholder="0987654321" />
                            </div>                            
                            <div>
                                <label className="label">Password</label>
                                <input type="password"
                                    name='password'
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    className="input" placeholder="Password" />
                            </div>
                           
                        </div>
                        {loading ? <button className='mt-4 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                            <button type='submit' className="mt-4 btn btn-neutral">Admin Signup</button>
                        }
                        <span>Already have an account? <Link to='/admin/login'>Admin Login</Link></span>
                    </form>
                </div>
            </div>
        </div></div>
    )
}

export default AdminRegister