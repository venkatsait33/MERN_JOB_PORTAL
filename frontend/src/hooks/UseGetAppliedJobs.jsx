import axios from 'axios'
import React, { useEffect } from 'react'
import { APPLICATION_API_END_POINT } from '../utils/axiosApiConstants'
import { useDispatch } from 'react-redux'
import { setAllAppliedJobs } from '../redux/jobSlice'

const UseGetAppliedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.application))
                }
            } catch (error) {

                console.log(error);
            }
        }
        fetchAppliedJobs()
    }, [])
}

export default UseGetAppliedJobs