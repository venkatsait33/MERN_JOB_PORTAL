import React from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { MdKeyboardArrowRight, MdOutlineHomeWork } from 'react-icons/md';
import { PiHandbagSimpleBold } from 'react-icons/pi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SimilarJobs = ({ singleJob,allJobs }) => {    

    const filteredJobs = allJobs.filter(
        (job) => job.category === singleJob.category && job._id !== singleJob._id
    );

    return (
        <div className='mt-6 w-[300px]'>
            <h2 className='mb-4 text-xl font-bold'>Similar Jobs</h2>
            {filteredJobs.length === 0 ? (
                <p>No similar jobs found.</p>
            ) : (
                <div className='flex flex-col gap-3'>
                    {filteredJobs.map((job) => (
                        <div key={job._id} className='p-4 transition border rounded-lg shadow-sm border-base-200 hover:shadow-md'>
                            <div className='flex items-center justify-between'>
                                <div className='flex gap-3'>
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
                                        <h3 className='text-lg font-semibold'>{job.title}</h3>
                                        <p className='text-sm text-gray-600'>{job?.company?.name}</p>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <Link
                                        to={`/job/description/${job._id}`}
                                        className='text-blue-600 hover:underline'
                                    >
                                        <MdKeyboardArrowRight className='text-2xl' />
                                    </Link>
                                </div>
                            </div>
                       
                            <p className='flex items-center gap-2 my-1 font-semibold'><CiLocationOn /><span className='pl-4 font-normal ' > {job?.location || "N/A"}</span></p>
                            <p className='flex items-center gap-2 my-1 font-semibold'><PiHandbagSimpleBold /><span className='pl-4 font-normal ' >{job?.experience || "N/A"} yr</span></p>
                            <p className='flex items-center gap-2 my-1 font-semibold'><FaIndianRupeeSign /><span className='pl-4 font-normal '> {job?.salary || "N/A"}LPA</span></p>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SimilarJobs
