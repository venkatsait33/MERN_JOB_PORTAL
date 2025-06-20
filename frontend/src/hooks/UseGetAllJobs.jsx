import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/axiosApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const UseGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchQuery } = useSelector((store) => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const url = searchQuery
                    ? `${JOB_API_END_POINT}/get?keyword=${searchQuery}`
                    : `${JOB_API_END_POINT}/get`;

                const res = await axios.get(url, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.job));
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchAllJobs();
    }, [searchQuery]);
};

export default UseGetAllJobs;
