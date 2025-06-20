import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../../utils/axiosApiConstants';
import { setUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';

const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }
    return (
        <div className=''>
            {
                open && <div className="fixed inset-0 mt-10 z-50 flex items-center justify-center bg-base-100 opacity-90 h-[90%] mx-auto my-10 card max-md:w-[80%] lg:w-[55%]">
                    <div className="w-full max-w-xl p-4 card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Edit Details</h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-center md:text-2xl btn btn-circle btn-ghost"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-scroll">
                            <div>
                                <label className="">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={input.fullname}
                                    id='fullname'
                                    onChange={changeEventHandler}
                                    className="w-full max-w-xl input "
                                    required
                                />
                            </div>
                            <div>
                                <label className="">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    id='email'
                                    className="w-full max-w-xl input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="">
                                    Number
                                </label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    id='number'
                                    className="w-full max-w-xl input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="">
                                    Bio
                                </label>
                                <input
                                    type="text"
                                    name="bio"
                                    id='bio'
                                    onChange={changeEventHandler}
                                    value={input.bio}
                                    className="w-full max-w-xl input"
                                    required
                                />
                            </div><div>
                                <label className="">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    id='skills'
                                    onChange={changeEventHandler}
                                    value={input.skills}
                                    className="w-full max-w-xl input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="">
                                    Resume
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id='file'
                                    onChange={changeFileHandler}
                                    accept='application/pdf'
                                    className="w-full max-w-xl input"
                                    required
                                />
                            </div>
                            {
                                loading ? <button className='w-full btn-outline'><span className="loading loading-spinner loading-xl"></span></button> : <button className='w-full text-xl btn btn-primary' type='submit'>save</button>
                            }

                        </form>
                    </div>
                </div>
            }
        </div>
    )
}


export default UpdateProfile