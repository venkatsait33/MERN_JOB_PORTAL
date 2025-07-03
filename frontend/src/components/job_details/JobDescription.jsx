import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/axiosApiConstants.js'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../../redux/jobSlice.js'
import { toast } from 'react-toastify';
import { IoArrowBack } from "react-icons/io5";
import { DaysCountFunction } from '../../utils/DaysCountFunction.jsx'
import { MdOutlineHomeWork } from "react-icons/md";
import { CiLocationOn } from 'react-icons/ci'
import { FaIndianRupeeSign, FaRegBuilding, FaUserLarge } from 'react-icons/fa6'
import { LuUsersRound } from "react-icons/lu";
import { FaGraduationCap, FaRegClock } from "react-icons/fa";
import { RiEnglishInput } from "react-icons/ri";
import { PiHandbagSimpleBold } from "react-icons/pi";
import { TbCategoryPlus } from "react-icons/tb";
import { CgDarkMode } from "react-icons/cg";
import MDEditor from '@uiw/react-md-editor'
import SimilarJobs from './SimilarJobs.jsx'

const JobDescription = () => {
    const { user } = useSelector(store => store.auth)
    const { singleJob } = useSelector(store => store.job)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const jobId = params.id;
    const dispatch = useDispatch()
    const isInitialApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitialApplied)
    // ✅ Redirect if user not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate]);

    const applyJobHandler = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                setIsApplied(true)
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error applying for job")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);




    return (
        <div className='p-8 mx-auto lg:max-w-7xl'>
            <div className='mb-4 '>
                <button onClick={() => navigate(-1)} className='text-2xl hover:border-gray-300 btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>
            <div className='p-10 border shadow-xl md:h-48 bg-base-200 rounded-2xl'>
                <div className='flex items-center justify-between md:gap-10 max-sm:gap-5 max-sm:flex-col'>
                    <div className='flex items-center gap-10 max-sm:flex-col lg:flex-row'>
                        <div className='rounded-full '>
                            {
                                singleJob?.company?.logo ? <>  <img
                                    className='object-cover w-20 h-20 rounded-full'
                                    alt="Company logo w-20 h-20"
                                    src={singleJob?.company?.logo}
                                /></> : <p>
                                    <MdOutlineHomeWork className='w-16 h-16 text-black bg-gray-100 rounded-full' />
                                </p>
                            }
                        </div>
                        <div>
                            <h1 className='text-xl font-bold max-sm:text-center'>{singleJob?.title}</h1>
                            <div className='grid gap-2 my-2 max-sm:items-center max-sm:flex lg:flex max-sm:flex-col'>
                                <div className="badge badge-soft hover:border-gray-300 "><FaUserLarge /> {singleJob?.positions || 0} Positions</div>
                                <div className="badge hover:border-gray-300 badge-soft b">JobType {singleJob?.jobType || "N/A"} </div>
                                <div className="badge hover:border-gray-300 badge-soft"> <FaIndianRupeeSign /> {singleJob?.salary || "N/A"}LPA</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center gap-2 my-2'>
                        {
                            user.role === 'candidate' && <button onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`rounded-lg btn ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                                {loading ?
                                    <button className=''><span className="loading loading-spinner loading-lg"></span></button>
                                    :
                                    <button type='submit' className=""> {isApplied ? 'Already Applied' : 'Apply Now'}</button>}
                            </button>
                        }
                        <p className='text-sm text-gray-500'>Posted  {DaysCountFunction(singleJob?.createdAt) === 0 ? "Today" : `${DaysCountFunction(singleJob?.createdAt)} days ago`}</p>
                    </div>

                </div>
            </div>
            <div className='flex gap-5'>
                <div className='flex flex-col md:w-[80%] p-4 transition border rounded-lg shadow-sm border-base-200 hover:shadow-md mt-2 '>
                    <h1 className='mt-3 font-medium '>Job Description</h1>
                    <div className='grid grid-cols-2 gap-3 py-2 border-b-2 max-sm:grid-cols-1 border-b-gray-300'>
                        <p className='my-1 font-semibold'>Posted Date: <span className='pl-4 font-normal ' >{singleJob?.createdAt?.split('T')[0]}</span></p>
                        <p className='my-1 font-semibold'>Total Applicants: <span className='pl-4 font-normal ' >{singleJob?.applications?.length || 0} </span></p>
                    </div>
                    <>
                        <div className='grid grid-cols-2 gap-3 mt-2 mb-4 max-sm:grid-cols-1'>
                            <p className='my-1 mt-4 font-semibold'>Job Title: <span className='pl-4 font-normal ' >{singleJob?.title}</span></p>

                            <p className='flex items-center gap-2 my-1 font-semibold'><FaIndianRupeeSign />Salary: <span className='pl-4 font-normal '> {singleJob?.salary || "N/A"}</span></p>
                        </div>
                        <div tabIndex={0} className=" collapse collapse-arrow">
                            <input type="checkbox" />
                            <div className="font-semibold collapse-title">Job Description</div>
                            <div className=" max-sm:mb-4 collapse-content">
                                <MDEditor.Markdown source={singleJob?.description} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent', color: 'gray' }} />
                            </div>
                        </div>


                        <div className='mt-4 max-sm:mb-4'>
                            <p className='text-xl font-semibold text-center'>Job Role</p>
                            <div className='grid grid-cols-2 gap-3 mt-2 max-sm:grid-cols-1'>
                                <p className='flex items-center gap-2 my-1 font-semibold'><FaRegBuilding />Department: <span className='pl-4 font-normal ' >
                                    {singleJob?.department || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><TbCategoryPlus />Role/Category: <span className='pl-4 font-normal ' > {singleJob?.category || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><CiLocationOn />Location: <span className='pl-4 font-normal ' > {singleJob?.location || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'> <FaRegClock />Job Type: <span className='pl-4 font-normal ' >{singleJob?.jobType || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><CgDarkMode />Job Shift: <span className='pl-4 font-normal ' > {singleJob?.jobShifts || "N/A"}</span></p>

                            </div>
                        </div>
                        <div className='mt-2 max-sm:mb-4'>
                            <p className='text-xl font-semibold text-center'>Job requirements</p>
                            <div className='grid grid-cols-2 gap-3 mt-2 max-sm:grid-cols-1'>
                                <p className='flex items-center gap-2 my-1 font-semibold'><PiHandbagSimpleBold />Experience: <span className='pl-4 font-normal ' >{singleJob?.experience || "N/A"} yr</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'> <LuUsersRound />Gender: <span className='pl-4 font-normal ' >{singleJob?.gender || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><FaGraduationCap />Education: <span className='pl-4 font-normal ' >{singleJob?.education || "N/A"}</span></p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><RiEnglishInput />English Level: <span className='pl-4 font-normal ' >{singleJob?.englishLevel || "N/A"}</span></p>
                            </div>
                        </div>
                        <div>
                            <p className='mt-2 text-xl font-semibold text-center'>About Company</p>
                            <div className='flex flex-col gap-4'>
                                <p className='flex items-center gap-2 my-1 font-semibold'><FaRegBuilding />Name: <span>{singleJob?.company?.name || "N/A"}</span> </p>
                                <p className='flex items-center gap-2 my-1 font-semibold'><FaRegBuilding />Address: <span>{singleJob?.company?.location || "N/A"}</span> </p>
                            </div>
                        </div>
                    </>
                </div>
                <div className='max-sm:hidden '>
                    <SimilarJobs singleJob={singleJob} /></div>
            </div>

        </div>
    )
}

export default JobDescription