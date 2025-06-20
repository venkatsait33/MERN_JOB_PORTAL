import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { COMPANY_API_END_POINT } from '../utils/axiosApiConstants'
import { setSingleCompany } from '../redux/companySlice'

const UseGetCompanyById = ({ companyId }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanyById();
    }, [companyId, dispatch])
}

export default UseGetCompanyById