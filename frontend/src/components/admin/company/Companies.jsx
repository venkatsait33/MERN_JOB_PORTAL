import React, { useEffect, useState } from 'react'
import UseGetAllCompanies from '../../../hooks/UseGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../../redux/companySlice';
import CompanyTable from './CompanyTable';

const Companies = () => {
  UseGetAllCompanies();
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(searchInput))
  }, [searchInput])

  return (
    <div>
      <div className='max-w-6xl p-8 mx-auto max-sm:max-w-2xl max-md:max-w-4xl '>

        <div className='flex items-center justify-between gap-2'>
          <input type="text" className='input btn-outline' onChange={(e) => setSearchInput(e.target.value)} placeholder='filter by name' />
        </div>

        <div className='mt-3'>
          <CompanyTable />
        </div>
      </div>
    </div>
  )
}

export default Companies