import { useRef } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'
const ProfilePictureSelector = ({ handleImageChange, previewUrl, setPreviewUrl, image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null)
    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
        if (setPreview) {
            setPreview(null)
        }
    }

    const onChoseFile = () => {
        inputRef.current.click()
    }
    return (
        <div className='flex justify-center mb-6'>
            <input type="file" accept='image/*' className='hidden' ref={inputRef} onChange={handleImageChange} />

            {
                !image ? (
                    <div className='relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer bg-sky-50'>
                        <LuUser className='text-4xl text-sky-500' />
                        <button type='button' onClick={onChoseFile} className='absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-linear-to-r from-sky-500 to-cyan-500 -bottom-1 -right-1'>
                            <LuUpload />
                        </button>
                    </div>
                ) : (
                    <div className='relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer bg-sky-50'>
                        <img src={preview || previewUrl} alt="Profile Picture" className='object-cover w-20 h-20 rounded-full' />
                        <button onClick={handleRemoveImage} className='absolute flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full cursor-pointer -bottom-1 -right-1'>
                            <LuTrash />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ProfilePictureSelector