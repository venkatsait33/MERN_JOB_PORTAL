import axios from 'axios';
import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../redux/authSlice';
import { validateEmail } from '../utils/helper';
import Input from '../components/Input';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FaGoogle } from 'react-icons/fa6';

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
    const { loading, user } = useSelector(store => store.auth);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();

            // Send token to backend
            const response = await axios.post(`${USER_API_END_POINT}/firebase-login`, { token });
            toast.success(response.data.message);
            dispatch(setUser(response.data.user))
            const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin"); // Clean up
            navigate(redirectPath);
            console.log(response.data); // User from MongoDB
        } catch (error) {
            console.error("Firebase login error:", error);
        }

    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateEmail(input.email)) {
            toast.error('Please enter valid email');
            return;
        }
        // if (input.password.length < 6) {
        //     toast.error('Password must be at least 6 characters');
        //     return;
        // }
        if (!input.role) {
            toast.error('Please select role');
            return;
        }
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
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                localStorage.removeItem("redirectAfterLogin"); // Clean up
                navigate(redirectPath);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    })
    return (
        <div>
            <div className='flex items-center justify-center '>

                <div className="w-full max-w-sm card shrink-0">

                    <div className="card-body">
                        <h1 className='text-xl text-center'>Login</h1>
                        <div className='flex items-center justify-center mt-2'>
                            <button onClick={handleGoogleLogin} className='gap-2 btn btn-outline btn-accent'><span><FaGoogle /></span>Google Login</button>
                        </div>
                        <p className="text-center divider">OR</p>
                        <form onSubmit={submitHandler} className='flex flex-col gap-3 '>
                            <div className="fieldset">

                                <div>
                                    <label className="label">Email</label>
                                    <Input type="email"
                                        name='email'
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="input" placeholder="user@email.com" />
                                </div>

                                <div>
                                    <label className="label">Password</label>
                                    <Input type="password"
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
                            <div className='flex items-center'>Create a new account? <div onClick={() => {
                                document.getElementById('signup_model').showModal();
                                document.getElementById('login_modal').close();
                            }} className='ml-2 link link-primary'>Sign Up</div></div>
                        </form>
                    </div>
                </div>
            </div></div>
    )
}

export default Login