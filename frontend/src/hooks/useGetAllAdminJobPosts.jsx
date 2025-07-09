import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { JOB_API_END_POINT } from '../utils/axiosApiConstants'
import { setAllRecruiterJobs } from '../redux/jobSlice'

const useGetAllAdminJobPosts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobPosts = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getrecruiterjobs`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setAllRecruiterJobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobPosts();
    }, [])
}

export default useGetAllAdminJobPosts