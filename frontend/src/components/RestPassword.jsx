import React, { useRef, useState } from 'react'
import { MdEmail, MdPassword } from 'react-icons/md';
import OtpVerification from './OtpVerification';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RestPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(0);

  const inputRefs = useRef([]);
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const onSubmitEmailHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/send-rest-otp`, { email }, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        setIsEmailSent(true)

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }
  const onSubmitOtpHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const otpArray = inputRefs.current.map(input => input.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
    setLoading(false)
  }

  const onSubmitNewPasswordHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/rest-password`, { email, otp, password }, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = () => { }
  return (
    <div className='flex items-center justify-center w-full h-screen mx-auto bg-gradient-to-br from-blue-200 to-purple-400'>
      {!isEmailSent &&
        <div className='p-4 border rounded-lg shadow-lg bg-base-100 w-96'>
          <form className='card' onSubmit={onSubmitEmailHandler}>
            <div className='card-body'>
              <h1 className='text-xl card-title'>Rest Password</h1>

              <h1 className='text-sm'>Enter registered email:</h1>
              <div className='flex items-center gap-4 mb-4' onPaste={handlePaste}>
                <span className='text-2xl'><MdEmail /></span>
                <input type="email" className='w-full input input-bordered' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email id' />
              </div>
              {loading ? <button className='mt-2 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                <button type='submit' className="mt-2 btn btn-neutral">Verify Email</button>
              }
            </div>
          </form>
        </div>
      }
      {/* OTP input form */}
      {
        !isOtpSubmitted && isEmailSent &&

        <div>
          <OtpVerification inputRefs={inputRefs} onSubmitHandler={onSubmitOtpHandler} loading={loading} />
        </div>
      }

      {/* enter password */}
      {
        isEmailSent && isOtpSubmitted &&

        <div className='p-4 border rounded-lg shadow-lg bg-base-100 w-96'>
          <form className='card' onSubmit={onSubmitNewPasswordHandler}>
            <div className='card-body'>
              <h1 className='text-xl card-title'>New Password</h1>

              <h1 className='text-sm'>Enter New Password</h1>
              <div className='flex items-center gap-4 mb-4' onPaste={handlePaste}>
                <span className='text-2xl'><MdPassword /></span>
                <input type="password" className='w-full input input-bordered' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
              </div>
              {loading ? <button className='mt-2 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                <button type='submit' className="mt-2 btn btn-neutral">Submit</button>
              }
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default RestPassword