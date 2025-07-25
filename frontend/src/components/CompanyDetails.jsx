import axios from 'axios';
import { useEffect, useState } from 'react'
import { COMPANY_API_END_POINT } from '../utils/axiosApiConstants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineHomeWork } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { BsBrowserChrome } from "react-icons/bs";
import { IoArrowBack } from 'react-icons/io5';

const CompanyDetails = () => {
    const [company, setCompany] = useState({});
    const params = useParams()
    const companyId = params.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                })
                if (res.data.success) {
                    setCompany(res.data.company);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany();
    }, []);

    return (
        <div className='p-8 mx-auto lg:max-w-7xl'>
            <div className='mb-4 '>
                <button onClick={() => navigate(-1)} className='text-2xl hover:border-gray-300 btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>
            <div className='p-10 border shadow-xl md:h-52 bg-base-200 rounded-2xl'>
                <div className='flex items-center justify-between md:gap-10 max-sm:gap-5 max-sm:flex-col'>
                    <div className='flex items-center gap-10 max-sm:flex-col lg:flex-row'>
                        <div className='rounded-full '>
                            {
                                company?.logo ? <>  <img
                                    className='w-32 h-32 rounded-full max-sm:h-20 max-sm:w-20'
                                    alt="Company logo w-32 h-32"
                                    src={company?.logo}
                                /></> : <p>
                                    <MdOutlineHomeWork className='w-16 h-16 text-black bg-gray-100 rounded-full' />
                                </p>
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-2xl font-bold max-sm:text-center'>{company?.name}</h1>
                            <p className='flex items-center gap-2 my-1 font-semibold'><CiLocationOn />Location: <span className='pl-4 font-normal ' > {company?.location || "N/A"}</span></p>
                            <a
                                href={
                                    company?.website?.startsWith("http")
                                        ? company.website
                                        : `https://${company?.website}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex items-center gap-2 my-1 font-semibold link'
                            > <BsBrowserChrome />
                                <span className='pl-4 font-normal ' > {company?.name || "N/A"}</span>
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h1>Description:{company?.description || "N/A"}</h1>
            </div>
            <div className="divider"></div>
            <h1 className='mt-4 text-2xl font-bold'>Jobs Posts</h1>
            <div className='flex flex-col gap-4'>
                {
                    company?.jobs?.length > 0 ?

                        company?.jobs?.map((job) => {
                            return (
                                <div key={job._id} className='shadow-xl card '>
                                    <div className='flex flex-col gap-2 card-body'>
                                        <Link to={`/job/description/${job._id}`} className='my-1 mt-4 font-semibold'>Job Title : <span className='font-semibold link'>{job.title}</span></Link>
                                        <p className='flex items-center gap-2 my-1 '><CiLocationOn />Location: <span className='pl-4 font-semibold ' > {job?.location || "N/A"}</span></p>
                                        <p className='flex items-center gap-2 my-1 '><FaIndianRupeeSign />Salary: <span className='pl-4 font-semibold '> {job?.salary || "N/A"}</span></p>
                                        <p className='my-1 '>Posted Date: <span className='pl-4 font-semibold ' >{job?.createdAt?.split('T')[0]}</span></p>
                                    </div>
                                </div>
                            )
                        }) : <><p>No Jobs Available</p></>
                }
            </div>
        </div>
    )
}

export default CompanyDetails