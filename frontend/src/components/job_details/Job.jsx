import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DaysCountFunction } from '../../utils/DaysCountFunction';
import { toast } from 'react-toastify';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/axiosApiConstants';
import { CiLocationOn, FaBookmark, FaIndianRupeeSign, FaUserLarge, MdOutlineHomeWork } from '../../utils/icons'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(job?.isSaved || false);
    const [isApplied, setIsApplied] = useState(job?.isApplied || false);

    const handleSaveUnsaveJob = async (jobId) => {
        try {
            if (isApplied) return;

            if (isSaved) {
                const res = await axios.post(`${APPLICATION_API_END_POINT}/unsave-job`, { jobId }, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    setIsSaved(false);
                }
            } else {
                const res = await axios.post(`${APPLICATION_API_END_POINT}/save-job`, { jobId }, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
                if (res.data.success) {
                    toast.success(res.data.message);
                    setIsSaved(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Action failed");
        }
    };

    return (
        <div className='p-1 border border-gray-300 rounded-lg shadow-lg card'>
            <div className='card-body'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {DaysCountFunction(job?.createdAt) === 0 ? "Today" : `${DaysCountFunction(job?.createdAt)} days ago`}
                    </p>
                    <button
                        onClick={() => !isApplied && handleSaveUnsaveJob(job._id)}
                        disabled={isApplied}
                        className={`cursor-pointer ${isApplied ? 'text-gray-400' : isSaved ? 'text-green-600' : 'text-gray-400'}`}
                        title={isApplied ? "Already Applied" : isSaved ? "Unsave Job" : "Save Job"}
                    >
                        <FaBookmark size={20} />
                    </button>
                </div>

                <div className='flex items-center gap-5 my-4'>
                    <button className='rounded-full '>
                        {
                            job?.company?.logo ? <>  <img
                                className='object-cover w-20 h-20 rounded-full'
                                alt="Company logo w-20 h-20"
                                src={job?.company?.logo}
                            /></> : <p>
                                <MdOutlineHomeWork  className='w-16 h-16 text-black bg-gray-100 rounded-full' />
                            </p>
                        }
                       
                        
                    </button>
                    <div>
                        <h1 className='text-xl font-semibold'>{job?.title}</h1>
                        <h1 className='text-lg font-bold'>{job?.company?.name}</h1>
                        <p className='mt-2 text-md btn btn-sm'><CiLocationOn />{job?.location}</p>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2 my-2 max-sm:grid max-sm:grid-cols-3 md:flex'>
                    <div className="btn btn-sm btn-primary"><FaUserLarge />{job?.positions} positions</div>
                    <div className="btn btn-sm btn-secondary">{job?.jobType}</div>
                    <div className="btn btn-sm"><FaIndianRupeeSign/>{job?.salary}</div>
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        onClick={() => navigate(`/job/description/${job?._id}`)}
                        className='btn btn-outline'
                    >
                        Details
                    </button>
                    <button
                        onClick={() => !isApplied && handleSaveUnsaveJob(job._id)}
                        disabled={isApplied}
                        className={`btn btn-sm ${isApplied
                            ? 'btn-disabled text-gray-400'
                            : isSaved
                                ? 'btn-success'
                                : 'btn-outline btn-accent'}`}
                    >
                        {isApplied ? 'Already Applied' : isSaved ? 'Saved' : 'Save For Later'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Job;
