import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../../../utils/axiosApiConstants';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { setSingleCompany } from '../../../redux/companySlice';
import { useDispatch } from 'react-redux';

const CreateCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch()

    //http://localhost:8000/api/v1/company/register

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company))
                const companyId = res?.data?.company?._id
                navigate(`/recruiter/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='container flex flex-col items-center justify-center h-screen max-w-4xl gap-2 mx-auto max-sm:p-4'><div>
            <h1 className='text-2xl font-bold'>Company Name</h1>
            <p>What would you like to give your company name? you can change this later.</p>
            <div className='mt-4'>

                <h1 className='mb-2 label'> Company Name</h1>
                <input type="text" onChange={(e) => setCompanyName(e.target.value)} className='w-full input input-bordered input-primary' placeholder='MicroSoft, Google, Amazon' />
                <div className='flex items-center gap-10 my-10'>
                    <button onClick={() => navigate('/recruiter')} className=' btn btn-outline'>Cancel</button>
                    <button onClick={registerNewCompany} className=' btn btn-primary'>Continue</button>
                </div>
            </div>
        </div></div>
    )
}

export default CreateCompany