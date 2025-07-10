import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../utils/axiosApiConstants'
import axios from 'axios'
import { setCompanies } from '../redux/companySlice'

const UseGetAllCompanies = () => {
    const dispatch = useDispatch()
    const fetchCompany = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                withCredentials: true
            })

            if (res.data.success) {
                dispatch(setCompanies(res.data.company));
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCompany();
    }, [])

    return { refetch: fetchCompany };
}

export default UseGetAllCompanies