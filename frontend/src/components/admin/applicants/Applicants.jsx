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

  useEffect(() => {
    fetchAllApplicants();
  }, [])
  return (
    <div>
      <div className='p-4 mx-auto max-w-7xl'>
        <h1 className='mt-4 text-xl font-bold '>Applicants: {applicants?.applications?.length}</h1>
        <div className='mt-2'>
          {applicants?.applications?.length === 0 ? <p>No applicants found</p> : <ApplicantsTable fetchAllApplicants={fetchAllApplicants} />}

        </div>
      </div>
    </div>
  )
}

export default Applicants