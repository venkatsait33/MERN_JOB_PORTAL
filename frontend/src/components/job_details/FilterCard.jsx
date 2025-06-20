import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/jobSlice';
import { filterDataLocation, filterDataLocationCategory } from '../selectOptionsData';
import UseGetAllJobs from '../../hooks/UseGetAllJobs';
import FilterData from './FilterData';

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState({
        location: null,
        category: null,
    });
    const [lastClick, setLastClick] = useState(null);
    const dispatch = useDispatch();

    const handleClick = (value) => {
        if (selectedValue === value && lastClick === value) {
            // Double click to unselect
            setSelectedValue(null);
        } else {
            setSelectedValue(value);
        }
        setLastClick(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])
    UseGetAllJobs();

    return (
        <div className="flex-col w-full gap-4 p-3 max-sm:gap-2 max-sm:flex">
            <h1 className="text-lg font-bold">Filter Jobs</h1>
            <hr className="mt-2" />
            {
                selectedValue && <div>
                    <button className='mt-2 btn btn-outline' onClick={() => setSelectedValue(null)}>Clear Filters</button>
                </div>
            }


            <div className='flex gap-2 max-md:items-center max-md:justify-between max-sm:items-center max-sm:justify-between md:flex-col' >
                <div>
                    <FilterData handleClick={handleClick} filterData={filterDataLocation} selectedValue={selectedValue} />
                </div>
                <div>
                    <FilterData handleClick={handleClick} filterData={filterDataLocationCategory} selectedValue={selectedValue} />
                </div>
            </div>
        </div>
    );
};

export default FilterCard;
