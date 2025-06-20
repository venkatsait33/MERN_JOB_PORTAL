import React, { useState, useMemo } from 'react';
import FilterCard from '../components/job_details/FilterCard';
import Job from '../components/job_details/Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const [sortOrder, setSortOrder] = useState("newest");

    // Sort using createdAt
    const sortedJobs = useMemo(() => {
        return [...allJobs].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }, [allJobs, sortOrder]);

    return (
        <div className='p-2 mx-auto mt-3 max-w-7xl max-sm:p-2'>
            
            <div className='gap-4 md:flex max-sm:flex-col'>
                {/* Filter sidebar */}
                <div className='lg:w-[20%]'>
                    <FilterCard />
                </div>

                {/* Job list & sorting */}
                <div className='flex-1 ml-2 h-[88vh] no-scrollbar overflow-y-auto pb-5'>
                    <div className='flex justify-end mb-3 mr-4'>
                        <div className='flex items-center gap-4'>
                            <label className='mr-2 font-medium'>Sort by:</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className='select select-bordered select-sm'
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>
                    </div>

                    {sortedJobs.length <= 0 ? (
                        <span>Job not found</span>
                    ) : (
                            <div className='grid grid-cols-1 gap-4 max-sm:grid-cols-1 lg:grid-cols-2'>
                            {sortedJobs.map((job) => (
                                <div key={job._id}>
                                    <Job job={job} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;
