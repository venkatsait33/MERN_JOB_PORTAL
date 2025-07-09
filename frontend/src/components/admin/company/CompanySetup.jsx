import axios from 'axios';
import { useState } from 'react'
import { IoArrowBack } from "react-icons/io5";
import { COMPANY_API_END_POINT } from '../../../utils/axiosApiConstants';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UseGetCompanyById from '../../../hooks/UseGetCompanyById';

const CompanySetup = () => {
    const [input, setInput] = useState({
        name: "",
        description: '',
        website: '',
        location: '',
        file: null
    })
    const { singleCompany } = useSelector(store => store.company)
    const params = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const changeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/recruiter/dashboard', { state: { activeMenu: 'Companies' } })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }

    }
    UseGetCompanyById({ companyId: params.id })

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })

    }, [singleCompany])


    return (
        <div className='max-w-5xl mx-auto my-10'>
            <div className='p-6 mx-auto border border-gray-300 w-[80%] rounded-lg'>
                <button onClick={() => navigate('/recruiter/companies')} className='flex items-center gap-3 font-semibold btn sm:btn-sm btn-outline'>
                    <IoArrowBack /> <span>Back</span>
                </button>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
                    <div className='' >
                        <h1 className='font-bold text-center max-sm:mt-6 max-sm:text-lg md:text-xl'>Update Company Details</h1>
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label htmlFor="" className='label'> Company Name</label>
                        <input type="text" name="name" value={input.name} onChange={changeHandler} className=' input input-bordered' />
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label htmlFor="" className='label'>Description</label>
                        <input type="text" name="description" value={input.description} onChange={changeHandler} className=' input input-bordered' />
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col '>
                        <label htmlFor="" className='label'> Company WebSite</label>
                        <input type="text" name="website" value={input.website} onChange={changeHandler} className=' input input-bordered' />
                    </div>
                    <div className='flex items-center justify-between gap-4 max-sm:flex-col'>
                        <label htmlFor="" className='label'> Company Location</label>
                        <input type="text" name="location" value={input.location} onChange={changeHandler} className=' input input-bordered' />
                    </div>

                    <div className='flex items-center justify-between gap-4 max-sm:flex-col'>
                        <label htmlFor="" className='label'>Logo</label>
                        <input type="file" name="file" className='file-input' accept='image/*' onChange={changeFileHandler} />
                    </div>

                    <div className='flex items-center justify-between mx-auto'>

                        {loading ? <button className='mt-4 btn btn-neutral'><span className="loading loading-spinner loading-lg"></span></button> :
                            <button type='submit' className="mt-4 btn btn-neutral">Update</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup