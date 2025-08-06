import axios from 'axios';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '../../utils/axiosApiConstants';
import { setUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

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
        formData.append('bio', input.bio);
        formData.append('skills', input.skills);

        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            setLoading(true);

            // 🔥 Get Firebase ID token if user logged in via Firebase
            let authHeader = {};
            const firebaseAuth = getAuth();
            const currentUser = firebaseAuth.currentUser;

            if (currentUser) {
                const idToken = await currentUser.getIdToken(true);
                authHeader = {
                    Authorization: `Bearer ${idToken}`
                };
            }

            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...authHeader // 🔥 Attach Authorization header if Firebase user
                },
                withCredentials: true // ✅ Keep for normal users
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
            document.getElementById('updateProfileForm').closest()
        }
    };

    return (
        <div className=''>
            <div className="items-center justify-center mx-auto max-md:w-[80%] card">
                <div className="w-full max-w-4xl p-4 card-body">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Edit Details</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 overflow-y-scroll no-scrollbar">
                        <div>
                            <label className="">
                                Name:
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
                                Email:
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
                                Number:
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
                                Bio:
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
                                Skills:
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
                                Resume:
                            </label>
                            <input
                                type="file"
                                name="file"
                                id='file'
                                onChange={changeFileHandler}
                                accept='application/pdf'
                                className="w-full max-w-xl input"

                            />
                        </div>
                        {
                            loading ? <button className='w-full btn-outline'><span className="loading loading-spinner loading-xl"></span></button> : <button className='w-full text-xl btn btn-primary' type='submit'>save</button>
                        }

                    </form>
                </div>
            </div>

        </div>
    )
}


export default UpdateProfile