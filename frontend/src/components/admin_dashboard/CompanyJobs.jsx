import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

const CompanyJobs = () => {
    const { id } = useParams();
    const { data } = useSelector(store => store.admin);
    const navigate = useNavigate();

    const jobs = data.filter(job => job.company?._id === id);

    return (
        <div className="max-w-4xl p-4 mx-auto md:h-[55vh]">
            <div>
                <button onClick={() => navigate(-1)} className='mb-4 text-xl btn btn-circle btn-sm'>
                    <IoArrowBack />
                </button>
            </div>

            <h1 className="mb-4 text-xl font-bold text-center">Jobs for Company</h1>

            {jobs.length === 0 ? (
                <p className="text-center">No job posts found for this company.</p>
            ) : (
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
            )}
        </div>
    );
};

export default CompanyJobs;
