import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

const Input = ({ type, name, value, onChange, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className="input " > <input type={
            type == 'password' ? (showPassword ? 'text' : 'password') : type
        }
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder} />

            {
                type === "password" && (
                    <>
                        {
                            showPassword ? (
                                <FaRegEye className='cursor-pointer icon' size={22} onClick={toggleShowPassword} />
                            ) : (
                                <FaRegEyeSlash className='cursor-pointer icon' size={22} onClick={toggleShowPassword} />
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Input