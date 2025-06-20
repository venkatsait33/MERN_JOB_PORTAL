import React, { useEffect, useState } from 'react'
import { InfiniteMovingCards } from '../utils/Infinite-Moving-Cards'
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice';
import UseGetAllJobs from '../hooks/UseGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { jobCategory } from './selectOptionsData';

const CardScroller = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleClick = (value) => {
        setSelectedValue(value);
    };


    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
        if (selectedValue) {

            navigate('/browse')
        }
    }, [selectedValue])
    UseGetAllJobs();
    return (
        <div className="max-[560px]:max-w-sm mx-auto  max-md:max-w-screen-md max-lg:w-full  rounded-md flex flex-col antialiased bg-grid-white/[0.05]  justify-center relative overflow-hidden">

            <InfiniteMovingCards
                items={jobCategory}
                handleClick={handleClick}
                selectedValue={selectedValue}
                direction="left"
                speed="slow"
            />
        </div>
    )
}

export default CardScroller