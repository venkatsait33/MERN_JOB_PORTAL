
const AdminDashboard = ({ dashboardData }) => {
    const { companies = [], jobs = [] } = dashboardData;
    const applicants = dashboardData?.applicants.length
    const companiesLength = dashboardData?.companies.length
    const jobsLength = dashboardData?.jobs.length

    // Helper function to get latest 5
    const getLatestItems = (items) => {
        return items
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    };

    const latestCompanies = getLatestItems(companies);
    const latestJobs = getLatestItems(jobs);
    return (
        <div className='pl-2 '>
            <h1 className='text-xl'>Welcome Admin</h1>

            <div className='flex items-center justify-between p-4 max-sm:flex-col'>
                <h1 className="mb-4 text-xl font-bold btn btn-primary btn-outline">Companies: {companiesLength}</h1>
                <h1 className="mb-4 text-xl font-bold btn btn-primary btn-outline">Jobs: {jobsLength}</h1>
                <h1 className="mb-4 text-xl font-bold btn btn-primary btn-outline">Applicants: {applicants}</h1>
            </div>

            <div className='flex justify-between gap-4 max-sm:flex-col '>
                <div className='flex-1'>
                    <h2 className="mb-4 text-xl font-bold">Latest Companies</h2>
                    {latestCompanies.length === 0 ? (
                        <p>No companies found.</p>
                    ) : (
                        <div className="flex flex-col gap-2 p-4 border border-gray-700 rounded-lg">
                            {latestCompanies.map((company) => (
                                <div
                                    key={company._id}
                                    className="p-4 transition rounded shadow-lg "
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={company.logo}
                                            alt={company.name}
                                            className="object-cover w-12 h-12 rounded-full"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{company.name}</h3>
                                            <p className="text-sm text-gray-500">{company.location}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Created on {new Date(company.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ✅ Latest Jobs Section */}
                <div className='flex-1'>
                    <h2 className="mb-4 text-xl font-bold">Latest Jobs</h2>
                    {latestJobs.length === 0 ? (
                        <p>No jobs found.</p>
                    ) : (
                        <div className="flex flex-col gap-2 p-4 border border-gray-700 rounded-lg">
                            {latestJobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="p-4 transition rounded shadow-lg hover:shadow-lg"
                                >
                                    <h3 className="text-lg font-semibold">{job.title}</h3>
                                    <p className="text-gray-500">{job.location}</p>
                                    <p className="text-sm text-gray-400">
                                        Created on {new Date(job.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        By: {job.created_by?.fullname || 'Unknown'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard