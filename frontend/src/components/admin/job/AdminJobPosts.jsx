import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import JobsTable from './JobsTable';
import { setSearchJobByText } from '../../../redux/jobSlice';
import useGetAllAdminJobPosts from '../../../hooks/useGetAllAdminJobPosts';

const AdminJobPosts = () => {
  useGetAllAdminJobPosts();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(searchInput))
  }, [searchInput])
  return (
    <div>
      <div className='max-w-6xl p-8 mx-auto max-sm:max-w-2xl max-md:max-w-4xl '>

        <div className='flex items-center justify-between gap-2'>
          <input type="text" className='input btn-outline' onChange={(e) => setSearchInput(e.target.value)} placeholder='filter by name' />
          <button className=' btn btn-primary' onClick={() => navigate('/admin/jobs/postjob')}>Post New Jobs</button>
        </div>

        <div className='mt-3'>
          <JobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobPosts