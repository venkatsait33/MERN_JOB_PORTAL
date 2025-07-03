import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//recruiter post job by login
export const postJob = async (req, res) => {
    try {
        const { title, description, location, requirements, salary, englishLevel, jobType, positions, department, education, gender, jobShifts, companyId, experience, category } = req.body
        const userId = req.id;
        if (!title || !description || !location || !requirements || !englishLevel || !salary || !jobType || !jobShifts || !education || !positions || !companyId || !experience || !category || !gender || !jobShifts || !department) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            department,
            category,
            location,
            jobType,
            salary,
            jobShifts,
            experience,
            education,
            englishLevel,
            gender,
            positions,
            company: companyId,
            created_by: userId,
        });

        return res.status(200).json({ message: "Job posted successfully", success: true, job })

    } catch (error) {
        console.log(error);
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const recruiterId = req.id;

        const { title, description, location, requirements, salary, jobType, positions, experience, category } = req.body

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false })
        }
        if (job.created_by.toString() !== recruiterId) {
            return res.status(403).json({
                message: "Unauthorized", success: false
            })
        }

        job.title = title || job.title;
        job.description = description || job.description;
        job.location = location || job.location;
        job.requirements = requirements || job.requirements.split(",")
        job.salary = salary || job.salary;
        job.jobType = jobType || job.jobType;
        job.positions = positions || job.positions;
        job.experience = experience || job.experience;
        job.category = category || job.category;


        await job.save();

        return res.status(200).json({ message: "Job updated successfully", success: true, job })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const userId = req.id;
        const keyword = req.query.keyword || '';

        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { location: { $regex: keyword, $options: 'i' } },
                { category: { $regex: keyword, $options: 'i' } },
            ]
        };

        const jobs = await Job.find(query)
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found", success: false });
        }

        // ✅ Fetch all application records by this user for the returned jobs
        const jobIds = jobs.map(job => job._id);
        const applications = await Application.find({
            job: { $in: jobIds },
            applicant: userId,
        }).populate({
            path: 'user'
        });

        // Create a map of jobId => { isSaved, isApplied }
        const appMap = {};
        applications.forEach(app => {
            appMap[app.job.toString()] = {
                isSaved: app.isSaved || false,
                isApplied: app.isApplied || false
            };
        });

        // ✅ Add isSaved and isApplied to each job object
        const jobsWithFlags = jobs.map(job => {
            const jobObj = job.toObject();
            const flags = appMap[job._id.toString()] || { isSaved: false, isApplied: false };
            jobObj.isSaved = flags.isSaved;
            jobObj.isApplied = flags.isApplied;
            return jobObj;
        });

        return res.status(200).json({
            message: "Jobs fetched successfully",
            success: true,
            job: jobsWithFlags
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications'
        }).populate({
            path: 'company'
        }).populate({
            path: 'created_by',
            select: '-password'
        })

        if (!job) {
            return res.status(400).json({ message: "job not found", success: false })
        }

        return res.status(200).json({ message: "Job fetched successfully", success: true, job })

    } catch (error) {
        console.log(error);
    }
}
//recruiter created jobs
export const getRecruiterJobs = async (req, res) => {
    try {

        const recruiterId = req.id;

        const jobs = await Job.find({ created_by: recruiterId }).populate({
            path: 'company'
        })

        if (!jobs) {
            return res.status(400).json({ message: "jobs not found", success: false })
        }

        return res.status(200).json({ message: " Recruiter Jobs Posted", success: true, jobs })

    } catch (error) {
        console.log(error);
    }
}