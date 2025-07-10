import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FaPencil } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { COMPANY_API_END_POINT } from '../../../utils/axiosApiConstants';
import UseGetAllCompanies from '../../../hooks/UseGetAllCompanies';

const TableComponent = ({ companyData, title, link }) => {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);
    const { refetch } = UseGetAllCompanies();

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

    const handleDelete = async (e, companyId) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                refetch(); // 🔥 Reload or remove from UI
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };



    return (
        <div>
            <h1 className='mt-3 mb-2 font-semibold text-center '>{title}</h1>
            <div className='overflow-y-scroll mt-4 md:h-[55vh] max-w-screen no-scrollbar'>
                <div className="overflow-x-auto border no-scrollbar rounded-box border-base-content/5 bg-base-100">

                    <table className="table">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {companyData?.map((item, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <figure className="w-10 rounded-full">
                                            <img
                                                src={item?.logo || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                alt=""
                                            />
                                        </figure>
                                    </td>
                                    <td><Link to={`/company/description/${item?._id}`} className='link'>{item?.name}</Link></td>
                                    <td>{item.createdAt.split("T")[0]}</td>
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
                                                <div className="absolute right-0 z-10 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg w-22">
                                                    <div className="py-1 text-sm text-gray-700">
                                                        <Link className="flex items-center w-full gap-2 px-4 py-2 text-left cursor-pointer hover:bg-gray-100" to={`${link}/${item._id}`}>
                                                            <span><FaPencil /></span>
                                                            Edit
                                                        </Link>
                                                        {/* <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                            Duplicate
                                                        </button> */}
                                                        <button
                                                            onClick={(e) => handleDelete(e, item._id)} className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableComponent