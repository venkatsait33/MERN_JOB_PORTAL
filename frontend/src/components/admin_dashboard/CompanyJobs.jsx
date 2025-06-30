import { useParams, useNavigate, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_DETAILS } from "../../utils/axiosApiConstants";

const CompanyJobs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState();

    useEffect(() => {
        const fetchCompanyJobs = async () => {
            try {
                const res = await axios.get(`${ADMIN_DETAILS}/recruiters-jobs-candidates`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setDashboardData(res.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCompanyJobs();
    }, []);

    const jobs = dashboardData?.filter(job => job.company?._id === id) || [];
    const companyName = jobs.length > 0 ? jobs[0]?.company?.name : "";

    return (
        <div className="max-w-4xl p-4 mx-auto md:h-[55vh]">
            <div>
                <button onClick={() => navigate(-1)} className='mb-4 text-xl btn btn-circle btn-sm'>
                    <IoArrowBack />
                </button>
            </div>

            {jobs.length > 0 ? (
                <>
                    <h1 className="mb-4 text-xl font-bold text-center">Job Posts</h1>
                    <p className="mb-4 font-bold text-center">
                        Company Name : &nbsp;
                        <span className="text-xl text-primary">{companyName}</span>
                    </p>
                    <div className="overflow-x-auto">
                        <table className="table w-full shadow rounded-2xl bg-base-100">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>{job.title}</td>
                                        <td>{job.location}</td>
                                        <td>{job.salary}</td>
                                        <td>
                                            <Link
                                                to={`/admin/dashboard/job/${job._id}`}
                                                className="text-blue-600 underline"
                                            >
                                                View Applicants
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p className="text-center">No job posts found for this company.</p>
            )}
        </div>
    );
};

export default CompanyJobs;
