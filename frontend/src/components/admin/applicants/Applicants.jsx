import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../../utils/axiosApiConstants'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../../redux/applicationSlice'

const Applicants = () => {
  const params = useParams();
  
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials: true
        })
        if (res.data.success) {
          dispatch(setApplicants(res.data.job))                  
        }
      } catch (error) {
        console.log(error);
      }

    }
    fetchAllApplicants();
  }, [])
  return (
    <div>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mt-4 text-xl font-bold '>Applicants: {applicants?.applications?.length}</h1>
        <div>
          <ApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default Applicants