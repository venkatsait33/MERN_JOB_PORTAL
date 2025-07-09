import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const getAllRecruiterData = async (req, res) => {
    try {
        const recruiterId = req.id; // Assuming userId is in req.user after auth middleware

        // Get all companies created by this recruiter
        const companies = await Company.find({ userId: recruiterId })
            .populate("userId") // recruiter info
            .lean();

        // Get all jobs posted by this recruiter
        const jobs = await Job.find({ created_by: recruiterId })
            .populate("company")
            .populate("created_by")
            .lean();

        // Get all applications applied to the recruiter's jobs
        const jobIds = jobs.map(job => job._id); // Get IDs of all jobs posted by recruiter

        const applicants = await Application.find({ job: { $in: jobIds } })
            .populate("job")
            .populate({
                path: "applicant",
                select: "-password"
            })
            .lean();

        res.status(200).json({
            success: true,
            companies,
            jobs,
            applicants
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
