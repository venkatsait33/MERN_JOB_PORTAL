import { useState } from 'react';
import CardScroller from './CardScroller';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '../../redux/jobSlice';

const HomeCoverSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchHandler = () => {
        dispatch(setSearchQuery(query)); // ✅ Store in Redux
        navigate('/browse') // ✅ Pass via URL
    }

    return (
        <div className='m-20'>
            <div className='flex flex-col gap-8 mt-20 md:ml-10'>
                <h4 className=' text-[#1F8268] md:text-2xl'>INDIA'S #1 FREELANCER PLATFORM</h4>
                <h1 className='font-bold md:text-4xl sm:text-2xl'>Your job search ends here</h1>
                <h4 className='text-lg font-semibold'>Discover career opportunities</h4>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        className="input md:input-xl input-bordered"
                        placeholder="Search for jobs, titles, or companies"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={searchHandler} className='btn md:btn-xl bg-[#1F8268]'>
                        Search for jobs
                    </button>
                </div>
                <div>
                    <p>Proud to Support</p>
                    <div className='flex gap-2'>
                        <img src="https://cdn.apna.co/apna-learn/Support%20Icons/ministry-of-labour-and-employment-logo.png" alt="" className='w-[135px] h-[40px] bg-white p-1' />
                        <img src="https://cdn.apna.co/apna-learn/Support%20Icons/aicte-seeklogo.png" alt="" className='w-[40px] h-[40px] bg-white p-1' />
                        <img src="https://cdn.apna.co/apna-learn/Support%20Icons/DPIIT-header-new.png" alt="" className='w-[135px] h-[40px] bg-white p-1' />
                    </div>
                </div>
                <div>
                    <CardScroller />
                </div>
            </div>
        </div>
    );
};

export default HomeCoverSection;
