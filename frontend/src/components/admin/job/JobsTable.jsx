import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6'; 

const JobsTable = () => {
    const { allRecruiterJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJob, setFilterJob] = useState(allRecruiterJobs);
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const menuRefs = useRef([]);
    const navigate = useNavigate();

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

    useEffect(() => {
        const filteredJobPosts = allRecruiterJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJob(filteredJobPosts);
    }, [allRecruiterJobs, searchJobByText])
    return (
        <div>
            <div className='overflow-y-scroll md:h-[46vh] max-w-screen'>
                <div className="overflow-x-auto border rounded-box border-base-content/5 bg-base-100">
                    <h1 className='mt-2 text-center '>''</h1>

                    <table className="table">

                        <thead>
                            <tr>
                                <th></th>
                                <th>Company Name</th>
                                <th>Job Title</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Applications</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterJob?.map((item, index) =>
                            (
                                <tr key={index}>

                                    <th>{index + 1}</th>
                                    <td>
                                        <div className='flex items-center gap-2'>
                                            <figure>
                                                <img src={item?.company?.logo || "https://via.placeholder.com/150"} alt="logo" className='w-12 h-12 rounded-full' />
                                            </figure>
                                            <h1>
                                                {item?.company?.name}
                                            </h1>
                                        </div>
                                    </td>

                                    <td>
                                        <Link to={`/job/description/${item?._id}`} className='link'>{item?.title}</Link>
                                    </td>
                                    <td>{item?.
                                        jobType
                                    }</td>
                                    <td>{item?.
                                        location
                                    }</td>

                                    <td>{item.createdAt.split("T")[0]}</td>
                                    <td className='text-center'>
                                        {item.applications.length}
                                    </td>
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
                                                        <Link className="flex items-center w-full gap-2 px-4 py-2 text-left cursor-pointer hover:bg-gray-100" to={`/admin/jobs/${item._id}/update`}>
                                                            <span><FaPencil /></span>
                                                            Edit
                                                        </Link>

                                                        <div className="flex items-center w-full gap-2 px-4 py-2 text-left cursor-pointer hover:bg-gray-100" onClick={() => navigate(`/admin/jobs/${item._id}/applicants/`)} >
                                                            <FaUserCircle className='text-xl' />
                                                            <p>Applicants</p>
                                                        </div>
                                                        {/* <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                        Duplicate
                                                    </button>
                                                    <button className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100">
                                                        Delete
                                                    </button> */}
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

export default JobsTable