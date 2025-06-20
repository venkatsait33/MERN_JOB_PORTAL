import HomeCoverSection from '../components/HomeCoverSection'
import PopularSearch from '../components/PopularSearch'
import JobOpeningsSection from '../components/job_details/JobOpeningsSection'
import { FaStar } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";
import UseGetAllJobs from '../hooks/UseGetAllJobs'
import LatestJobs from '../components/job_details/LatestJobs'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    UseGetAllJobs();
    const navigate = useNavigate()
    return (
        <div className=''>

            <div className=''>
                <HomeCoverSection />
                <PopularSearch />
                <JobOpeningsSection />
                <LatestJobs />
                <div className='flex items-center justify-center w-full h-[300px] bg-white text-black '>
                    <div className='flex flex-col gap-10'>
                        <h1 className='text-2xl font-bold'>Trending job roles</h1>
                        <button onClick={() => navigate('/jobs')} className='btn hover:bg-[#1F8268] btn-outline border border-[#1F8268]'>View all</button>
                    </div>
                </div>
                <div className='bg-white max-sm:p-4 md:p-8 '>

                    <div className='bg-[#F9F4FF] text-[#662194] flex items-center justify-center border rounded-l-2xl md:w-[80%] mx-auto md:h-[350px] md:gap-12 p-2 max-sm:h-[170px] '>
                        <div>
                            <h1 className='font-bold md:text-3xl'>Download app!</h1>
                            <div className='gap-2 mt-2 lg:flex max-md:flex-col max-sm:flex-col max-sm:text-sm'>
                                <p>Unlimited job applications | </p>
                                <p>HRs contact you directly | </p>
                                <p>Track your Applications</p>
                            </div>
                        </div>
                        <div className=''>
                            <img src="https://storage.googleapis.com/mumbai_apnatime_prod/apna-home/apna-app.png"
                                loading='lazy' className='md:h-[200px] max-sm:h-[100px]' alt="" />
                        </div>
                        <div>
                            <div>
                                <p className='flex items-center gap-1 font-semibold md:text-2xl'> <span className=' text-[#FFD166]'>
                                    <FaStar />
                                </span>4.4</p>
                                <p>5L reviews</p>
                            </div>
                            <div>
                                <p className='flex items-center gap-1 font-semibold md:text-2xl'><span>
                                    <MdFileDownload />
                                </span>1 cr+</p>
                                <p>App downloads</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage