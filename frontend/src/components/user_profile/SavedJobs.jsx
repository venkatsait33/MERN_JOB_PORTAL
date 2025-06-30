import { useEffect, useState } from "react";
import { FaBookmark } from 'react-icons/fa6';
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../../utils/axiosApiConstants";
import Job from '../job_details/Job'

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/saved-jobs`, {
                    withCredentials: true
                });
                if (res.data.success) {

                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchSaved();
    }, []);

    return (
        <div className="p-3 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                {savedJobs.length === 0 ? (
                    <div className="md:h-[40vh]"><p className="text-xl">No saved jobs found.</p></div>
                ) : (
                    savedJobs.map((job, index) => (
                        <div className="" key={index}>
                            <Job job={job} />
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default SavedJobs;
