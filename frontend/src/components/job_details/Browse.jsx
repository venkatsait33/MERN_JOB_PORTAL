import React, { useEffect } from 'react';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';
import UseGetAllJobs from '../../hooks/UseGetAllJobs';

const Browse = () => {

    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        }
    }, [])
    UseGetAllJobs();


    return (
        <div>
            <div className='p-4 mx-auto max-w-7xl max-sm:p-3'>
                <h1 className='my-10 text-xl font-bold'>Search Results ({allJobs.length})</h1>
                <div className='grid gap-4 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
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
