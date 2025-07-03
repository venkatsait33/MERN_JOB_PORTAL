import { useEffect } from 'react';
import axios from 'axios';
import { ADMIN_DETAILS } from '../utils/axiosApiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyData, setJobsData } from '../redux/adminDataSlice';

const UseGetAllDataForAdmin = () => {
    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobPosts = async () => {
            if (!user || user.role !== 'admin') return;
            try {
                const res = await axios.get(`${ADMIN_DETAILS}/recruiters-jobs-candidates`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setCompanyData(res?.data.companies))
                    dispatch(setJobsData(res.data.jobs))

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobPosts();
    }, [user])
}

export default UseGetAllDataForAdmin