import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: '',

    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] })
    }

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        //we append all data into formdata with files
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
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
        <div className='flex items-center justify-center min-h-screen '>
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
                            <div className='flex items-center gap-2 mt-2'>
                                <div className='flex items-center gap-2'>
                                    <input type="radio" name="role"
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
                            <div>
                                <label >Profile</label>
                                <input type="file" className="file-input"
                                    onChange={changeFileHandler}
                                    accept='image/*' />
                            </div>
                        </div>
                        {loading ? <button className='mt-4 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                            <button type='submit' className="mt-4 btn btn-neutral">SignUp</button>
                        }

                        <span>Already have an account? <Link to='/login'>Login</Link></span>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup