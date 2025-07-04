import { Link } from 'react-router-dom';

const AdminJobsDataDashboard = ({ dashboardData }) => {
    const jobs = dashboardData?.jobs
    return (
        <div className="p-4 mx-auto md:h-full">
            {jobs.length > 0 ? (
                <>
                    <h1 className="mb-4 text-xl font-bold text-center">Job Posts</h1>
                    <div className="overflow-x-auto">
                        <table className="table w-full shadow rounded-2xl bg-base-100">
                            <thead>
                                <tr>
                                    <th>Company Name</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job._id}>
                                        <td>{job?.company?.name}</td>
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
    )
}

export default AdminJobsDataDashboard