import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import {  useSelector } from 'react-redux';
import { APPLICATION_API_END_POINT } from '../../../utils/axiosApiConstants';
import { toast } from 'react-toastify';

//const shortListStatus = () => ['Accepted', 'Rejected']

const ApplicantsTable = ({ fetchAllApplicants }) => {
    const { applicants } = useSelector(store => store.application)

    const statusHandler = async (updatedStatus, id) => {
        try {
            //http://localhost:8000/api/v1/application/status/683197ea0ae427f47b3203ac/update
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, updatedStatus, {
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                fetchAllApplicants()
            }
        } catch (error) {
            console.log(error.response.message);
        }
    }

    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRefs.current.every(ref => ref && !ref.contains(e.target))
            ) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = (index) => {
        setOpenMenuIndex(prev => (prev === index ? null : index));
    };
    return (
        <div>
            <div className='md:h-[60vh] overflow-y-scroll max-w-screen p-4 no-scrollbar'>
                <h1 className='mt-2 mb-2 text-center '>Candidates Applied for {applicants?.title }</h1>
                <div className="overflow-x-auto border no-scrollbar md:h-[50vh] rounded-box border-base-content/5 bg-base-100">
                    <table className="table">

                        <thead>
                            <tr>
                                <th></th>
                                <th>FullName</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Resume</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                applicants && applicants?.applications?.map((applicant, index) => {
                                    return (
                                        <tr key={index}>

                                            <th>{index + 1}</th>
                                            <td>{applicant?.applicant.fullname}</td>
                                            <td>{applicant?.applicant.email}</td>
                                            <td>{applicant?.applicant.phoneNumber}</td>
                                            <td>
                                                <a className='link' href={applicant?.applicant?.profile?.resume} target='_blank'> {applicant?.applicant?.profile?.resumeOriginalName ? applicant?.applicant?.profile?.resumeOriginalName : 'No Resume'
                                                }</a>
                                            </td>
                                            <td>{applicant?.applicant?.createdAt.split("T")[0]}</td>
                                            <td>{applicant?.status}</td>
                                            <td>
                                                <div
                                                    className="relative inline-block text-left"
                                                    ref={el => (menuRefs.current[index] = el)}
                                                >
                                                    <button
                                                        onClick={() => toggleMenu(index)}
                                                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <svg
                                                            className="w-6 h-6 text-gray-600"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                                                        </svg>
                                                    </button>

                                                    {openMenuIndex === index && (
                                                        <div className="absolute right-0 z-10 w-32 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                                                            <div className="py-1 text-sm text-gray-700">
                                                                <div
                                                                    className="flex items-center w-full gap-2 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                                                                    onClick={() => {
                                                                        statusHandler({ status: 'accepted' }, applicant._id);
                                                                        setOpenMenuIndex(null); // close menu after action
                                                                    }}
                                                                >
                                                                    Accept
                                                                </div>

                                                                <div
                                                                    className="flex items-center w-full gap-2 px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                                                                    onClick={() => {
                                                                        statusHandler({ status: 'rejected' }, applicant._id);
                                                                        setOpenMenuIndex(null); // close menu after action
                                                                    }}
                                                                >
                                                                    Reject
                                                                </div>


                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ApplicantsTable