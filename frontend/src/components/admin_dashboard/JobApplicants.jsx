import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5";

const JobApplicants = () => {
    const { id } = useParams();
    const { data } = useSelector(store => store.admin);
    const navigate = useNavigate();

    const job = data.find(job => job._id === id);

    if (!job) return <div className="p-4 text-center">Job not found.</div>;

    return (
        <div className="max-w-4xl md:h-[55vh] p-4 mx-auto">
            <div>
                <button onClick={() => navigate(-1)} className='text-xl btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>
            <h1 className="mb-4 text-xl font-bold text-center">{job.title} - Applicants</h1>

            {job.applications.length === 0 ? (
                <p className="text-center">No applicants for this job.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full rounded-lg bg-base-100">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Resume</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {job.applications.map((app, i) => (
                                <tr key={i}>
                                    <td>{app?.applicant?.fullname}</td>
                                    <td>{app?.applicant?.email}</td>
                                    <td>{app?.applicant?.phoneNumber}</td>
                                    <td>
                                        {
                                            app?.applicant?.profile?.resume ? (
                                                <a
                                                    href={app.applicant.profile.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link"
                                                >
                                                    View Resume
                                                </a>
                                            ) : (
                                                "N/A"
                                            )
                                        }


                                    </td>
                                    <td>{app?.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default JobApplicants;
