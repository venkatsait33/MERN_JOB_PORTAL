import HomeCoverSection from '../components/home_page/HomeCoverSection'
import PopularSearch from '../components/home_page/PopularSearch'
import JobOpeningsSection from '../components/job_details/JobOpeningsSection'
import UseGetAllJobs from '../hooks/UseGetAllJobs'
import LatestJobs from '../components/job_details/LatestJobs'
import { useNavigate } from 'react-router-dom'
import PlayStoreApp from '../components/home_page/PlayStoreApp';
import Reviews from '../components/home_page/Reviews';

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
                <PlayStoreApp />
                <Reviews />
            </div>

        </div>
    )
}

export default HomePage