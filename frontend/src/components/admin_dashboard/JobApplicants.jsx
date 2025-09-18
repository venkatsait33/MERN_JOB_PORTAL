import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import { ADMIN_DETAILS } from "../../utils/axiosApiConstants";

const JobApplicants = () => {
  const { id } = useParams(); // job id from the URL
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${ADMIN_DETAILS}/recruiters-jobs-candidates`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const jobs = res.data.jobs;

          // Find the job with matching id
          const selectedJob = jobs.find((job) => job._id === id);

          if (selectedJob) {
            setApplicants(selectedJob.applications);
            setJobTitle(selectedJob.title);
          }
        }
      } catch (error) {
        console.error("Error fetching job applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  return (
    <div >
      {loading ? (
        <div className="flex items-center justify-center h-full mx-auto mt-20">
          <span className="flex items-center justify-center h-full mx-auto mt-20 loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <>
          <div>
            {
              !jobTitle && <div className="p-4 text-center">Job not found.</div>
            }

          </div>

          <div className="max-w-4xl md:h-[55vh] p-4 mx-auto">
            <div className="mt-4">
              <button
                onClick={() => navigate(-1)}
                className="text-xl btn btn-circle btn-sm"
              >
                <IoArrowBack />
              </button>
            </div>
            <h1 className="mb-4 text-xl font-bold text-center">
              {jobTitle} - Applicants
            </h1>

            {applicants.length === 0 ? (
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
                    {applicants.map((app, index) => (
                      <tr key={index}>
                        <td>{app?.applicant?.fullname || "N/A"}</td>
                        <td>{app?.applicant?.email || "N/A"}</td>
                        <td>{app?.applicant?.phoneNumber || "N/A"}</td>
                        <td>
                          {app?.applicant?.profile?.resume ? (
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
                          )}
                        </td>
                        <td>{app?.status || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default JobApplicants;
