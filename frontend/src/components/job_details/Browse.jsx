import React, { useEffect } from 'react';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';
import UseGetAllJobs from '../../hooks/UseGetAllJobs';

const Browse = () => {
    const { allJobs, searchQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    UseGetAllJobs();
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        }
    }, [])

    return (
        <div>
            <div className='p-4 mx-auto max-w-7xl max-sm:p-3'>
                <h1 className='my-10 text-xl font-bold'>Search Results ({allJobs.length})</h1>
                {/* {searchQuery && <h1 className='my-10 text-xl font-bold'>Search Results "{searchQuery}"</h1>} */}
                <div className='grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
                    {allJobs.map((job) => (
                        <div key={job._id}>
                            <Job job={job} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
