import { useState } from 'react';
import UpdateProfile from './UpdateProfile';
import { useSelector } from 'react-redux';
import {
    TiTick,
    FaPen,
    CiMail,
    IoIosContact
} from '../../utils/icons'

const Profile = () => {
    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth)
    return (
        <div className='flex max-w-4xl mx-auto md:mt-22 max-md:p-4 max-sm:p-2'>
            <div className='w-full mx-auto my-4'>
                <div className='border rounded-box border-base-content/5 card'>
                    <div className='card-body'>
                        <div className='flex items-center justify-between'>
                            <div className="flex items-center gap-5">
                                <figure>
                                    <img
                                        className='w-20 h-20 rounded-full'
                                        alt="Profile picture"
                                        src={user?.profile?.profilePhoto || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </figure>
                                <div>
                                    <h1 className='text-xl font-medium'>{user?.fullname || user?.name}</h1>
                                    <p> {user?.profile?.bio}</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="btn btn-outline btn-sm btn-circle"
                                    onClick={() =>
                                        document.getElementById("updateProfileForm").showModal()
                                    }
                                >
                                    <FaPen />
                                </button>
                                <dialog id="updateProfileForm" className="modal">
                                    <div className="modal-box">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button
                                                className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                                            >
                                                ✕
                                            </button>
                                        </form>
                                        <UpdateProfile open={open} setOpen={setOpen} />
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        <div>
                            <div className='flex items-center gap-4 mt-2 md:text-lg'>
                                <CiMail />
                                <span>{user?.email}</span>
                                <div className={`btn btn-circle btn-xs ${user?.isAccountVerified ? "bg-green-500" : "bg-red-500"}`}>
                                    {user?.isAccountVerified ? <div>
                                        <div className="flex justify-center tooltip " data-tip="Account Verified">
                                            <TiTick className="text-2xl font-bold text-center" />
                                        </div>

                                    </div> : <div className="flex justify-center tooltip" data-tip="Account Not Verified">
                                        <TiTick className="text-2xl font-bold text-center" />
                                    </div>}
                                </div>
                            </div>
                            <div className='flex items-center gap-4 mt-2 md:text-lg'>
                                <IoIosContact />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-lg font-semibold'>Skills</h1>
                            <div className='flex items-center gap-2 my-2'>
                                {
                                    user?.profile?.skills.length !== 0 ?
                                        user?.profile?.skills.map((item, index) => (
                                            <div key={index}>
                                                <div className="badge badge-primary">{item}</div>
                                            </div>
                                        )) : <div>No Skills Added</div>
                                }
                            </div>
                        </div>
                        <div className='grid items-center w-full max-w-sm gap-1.5'>
                            <label className='font-bold text-md' >Resume</label>
                            {
                                user?.profile?.resume ? <div>
                                    <a target='_blank' href={user?.profile?.resume} className='link ' >{user?.profile?.resumeOriginalName}</a>
                                </div> : <span>N/A</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Update profile dialog */}

        </div>
    )
}

export default Profile