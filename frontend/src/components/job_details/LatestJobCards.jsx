import { FaIndianRupeeSign, FaRegIdBadge, FaUserLarge } from 'react-icons/fa6';
import { MdOutlineHomeWork } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/job/description/${job?._id}`)} className='p-5 text-black bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer'>
            <div className='flex items-center gap-2'>
                <div className='rounded-full '>
                    {
                        job?.company?.logo ? <>  <img
                            className='object-cover w-20 h-20 rounded-full'
                            alt="Company logo w-20 h-20"
                            src={job?.company?.logo}
                        /></> : <p>
                            <MdOutlineHomeWork className='w-16 h-16 text-black bg-gray-100 rounded-full' />
                        </p>
                    }
                </div>
                <div>
                    <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
                    <h1 className='font-base medium text-'>{job?.company?.name}</h1>
                    <p className='text-sm'>India</p>
                </div>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <div className={'text-blue-700  flex items-center gap-2 my-1 font-semibold'} ><FaUserLarge /> {job?.positions} Positions</div>
                <div className={'text-[#F83002] flex items-center gap-2 my-1 font-semibold'}> <FaRegIdBadge />{job?.jobType}</div>
                <div className={'text-[#7209b7] flex items-center gap-2 my-1 font-semibold'}><FaIndianRupeeSign />{job?.salary} LPA</div>
            </div>

        </div>
    )
}

export default LatestJobCards