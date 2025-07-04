import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ADMIN_DETAILS } from '../utils/axiosApiConstants'
import { setAdminData } from '../redux/adminDataSlice'

const useGetAdminData = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const res = await axios.get(`${ADMIN_DETAILS}/recruiters-jobs-candidates`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setAdminData(res.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompany();
    }, [])
}

export default useGetAdminData