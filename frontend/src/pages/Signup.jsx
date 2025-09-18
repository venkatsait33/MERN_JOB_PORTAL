import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import ProfilePictureSelector from '../utils/ProfilePictureSelector';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null)
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null)
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
        setImage(e.target.files[0])
        const file = e.target.files[0]
        const preview = URL.createObjectURL(file)
        if (setPreview) {
            setPreview(preview)
        }
        setPreviewUrl(preview)
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
                navigate('/');
                document.getElementById('signup_model').close();
                toast.success(res.data.message);
                setInput({
                    ...input,
                    fullname: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    role: '',
                    file: '',
                });
                setImage(" ")
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex items-center justify-center '>
            <div className="w-full max-w-sm card shrink-0">

                <div className="card-body">
                    <h1 className='text-xl text-center'>Sign Up</h1>
                    <form onSubmit={submitHandler} className='flex flex-col gap-5 '>

                        <div className="fieldset">
                            <ProfilePictureSelector handleImageChange={changeFileHandler} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} image={image} setImage={setImage} preview={preview} setPreview={setPreview} />
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
                                <Input type="password"
                                    name='password'
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="Password" />
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
                            {/* <div>
                                <label >Profile</label>
                                <input type="file" className="file-input"
                                    onChange={changeFileHandler}
                                    accept='image/*' />
                            </div> */}
                        </div>
                        {loading ? <button className='mt-4 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                            <button type='submit' className=" btn btn-neutral">SignUp</button>
                        }

                        <div className="flex items-center">
                            Already have an account?
                            <div
                                onClick={() => {
                                    document.getElementById('login_modal').showModal();
                                    document.getElementById('signup_model').close();
                                }}
                                className="ml-2 link link-primary"
                            >
                                Login
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default Signup