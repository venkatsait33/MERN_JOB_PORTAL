import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const getAllRecruiterDataForAdmin = async (req, res) => {
    try {
        const companies = await Company.find()
            .populate("userId") // recruiter info
            .lean();
        const applicants = await Application.find()

        const jobs = await Job.find()
            .populate("company")
            .populate("created_by")
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    select: '-password'
                }
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