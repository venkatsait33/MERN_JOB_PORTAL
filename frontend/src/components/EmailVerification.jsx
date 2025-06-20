import axios from 'axios';
import { useRef, useState } from 'react'
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import OtpVerification from './OtpVerification';

const EmailVerification = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const inputRefs = useRef([]);

    const onSubmitHandler = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            const otpArray = inputRefs.current.map(input => input.value)
            const otp = otpArray.join('')
            const res = await axios.post(`${USER_API_END_POINT}/verify-otp`, { otp }, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center w-full h-screen mx-auto bg-gradient-to-br from-blue-200 to-purple-400'>
            <OtpVerification inputRefs={inputRefs} onSubmitHandler={onSubmitHandler} loading={loading} />
        </div>
    )
}

export default EmailVerification