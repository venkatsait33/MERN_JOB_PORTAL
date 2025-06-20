import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/job/description/${job?._id}`)} className='p-5 text-black bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer'>
            <div>
                <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                <p className='text-sm'>India</p>
            </div>
            <div>
                <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <div className={'text-blue-700 font-bold'} >{job?.positions} Positions</div>
                <div className={'text-[#F83002] font-bold'}> jobType {job?.jobType}</div>
                <div className={'text-[#7209b7] font-bold'}>{job?.salary}</div>
            </div>

        </div>
    )
}

export default LatestJobCards