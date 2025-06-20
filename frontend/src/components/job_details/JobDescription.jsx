import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../utils/axiosApiConstants.js'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../../redux/jobSlice.js'
import { toast } from 'react-toastify';
import { IoArrowBack } from "react-icons/io5";
import { DaysCountFunction } from '../../utils/DaysCountFunction.jsx'

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
                        <figure className='rounded-full '>
                            <img src={singleJob?.company?.logo} alt={singleJob?.company?.name} className='rounded-full h-30 w-30 hover:border-gray-300' />
                        </figure>
                        <div>
                            <h1 className='text-xl font-bold max-sm:text-center'>{singleJob?.title}</h1>
                            <div className='grid gap-2 my-2 max-sm:items-center max-sm:flex lg:flex max-sm:flex-col'>
                                <div className="badge badge-soft hover:border-gray-300 ">{singleJob?.positions || 0} Positions</div>
                                <div className="badge hover:border-gray-300 badge-soft b">JobType {singleJob?.jobType || "N/A"} </div>
                                <div className="badge hover:border-gray-300 badge-soft"> Salary {singleJob?.salary || "N/A"}LPA</div>
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
            {/* <div className='flex items-center justify-between gap-2'>


                {
                    isApplied ? <button className='cursor-not-allowed btn btn-outline' disabled={isApplied}>Applied</button> : <button className=' btn btn-neutral' onClick={isApplied ? null : applyJobHandler}>Apply Now</button>
                }
            </div> */}
            <h1 className='py-2 mt-3 font-medium border-b-2 border-b-gray-300'>Job Description</h1>
            <div>
                <h1 className='my-1 font-bold'>Role: <span className='pl-4 font-normal ' >{singleJob?.title}</span></h1>
                <h1 className='my-1 font-bold'>Category: <span className='pl-4 font-normal ' >{singleJob?.category || "N/A"}</span></h1>
                <h1 className='my-1 font-bold'>Location: <span className='pl-4 font-normal ' >{singleJob?.location}</span></h1>
                <h1 className='my-1 font-bold'>Job Type: <span className='pl-4 font-normal ' >{singleJob?.jobType}</span></h1>
                <h1 className='my-1 font-bold'>Description: <span className='pl-4 font-normal ' >{singleJob?.description || "N/A"}</span></h1>

                <h1 className='my-1 font-bold'>Experience: <span className='pl-4 font-normal ' >{singleJob?.experience} yr</span></h1>

                <h1 className='my-1 font-bold'>Salary: <span className='pl-4 font-normal ' >{singleJob?.salary || "N/A"}</span></h1>

                <h1 className='my-1 font-bold'>Total Applicants: <span className='pl-4 font-normal ' >{singleJob?.applications?.length || 0} </span></h1>
                <h1 className='my-1 font-bold'>Posted Date: <span className='pl-4 font-normal ' >{singleJob?.createdAt?.split('T')[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription