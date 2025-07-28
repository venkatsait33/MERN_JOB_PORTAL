import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import transporter from "../utils/nodemailer.js";

// it will check that candidate is already applied for this job or not
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job id is required", success: false });
        }
        //checking if the candidate is applied for job or not

        const appliedJob = await Application.findOne({ job: jobId, applicant: userId });


        if (appliedJob) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }

        // checking if the job exists or not
        const job = await Job.findById(jobId).populate({ path: 'company' });
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }

        const candidate = await User.findById(userId);
        if (!candidate.profile.resume) {
            return res.status(400).json({ message: "Please upload your resume before applying", success: false });
        }

        let application;

        // If there's a saved record, update it to mark as applied
        if (appliedJob) {
            application = await Application.findOneAndUpdate(
                { job: jobId, applicant: userId },
                { isApplied: true, isSaved: false },
                { new: true }
            );
        } else {
            // Otherwise create a new application
            application = await Application.create({
                job: jobId,
                applicant: userId,
                isApplied: true,
                isSaved: false
            });
        }
        // Add application to job
        job.applications.push(application._id);
        await job.save()


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: candidate.email,
            subject: "Applied For Job",
            text: "You have successfully applied for the job"
        };
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Application submitted successfully", success: true });

    } catch (error) {
        console.log(error);
    }
}

// {
//     import { transporter } from "../utils/mailer.js";

//     export const applyJob = async (req, res) => {
//         try {
//             const userId = req.id;
//             const jobId = req.params.id;

//             if (!jobId) {
//                 return res.status(400).json({ message: "Job id is required", success: false });
//             }

//             // Check if candidate already applied
//             const appliedJob = await Application.findOne({ job: jobId, applicant: userId });
//             if (appliedJob) {
//                 return res.status(400).json({ message: "You have already applied for this job", success: false });
//             }

//             // Check if job exists
//             const job = await Job.findById(jobId)
//                 .populate({ path: 'company', populate: { path: 'userId' } }); // populate recruiter info
//             if (!job) {
//                 return res.status(400).json({ message: "Job not found", success: false });
//             }

//             // Get candidate info
//             const candidate = await User.findById(userId);
//             if (!candidate.profile.resume) {
//                 return res.status(400).json({ message: "Please upload your resume before applying", success: false });
//             }

//             // Create application
//             const application = await Application.create({
//                 job: jobId,
//                 applicant: userId,
//                 isApplied: true,
//                 isSaved: false,
//             });

//             // Add application to job
//             job.applications.push(application._id);
//             await job.save();

//             // 📧 Send email to Candidate
//             const candidateMailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: candidate.email,
//                 subject: `Applied for ${job.title}`,
//                 html: `
//                 <h2>Hi ${candidate.name},</h2>
//                 <p>You have successfully applied for the job <strong>${job.title}</strong> at <strong>${job.company.name}</strong>.</p>
//                 <p>We’ll notify you about updates from the recruiter.</p>
//                 <p>Thank you for using JobPortal!</p>
//             `
//             };

//             // 📧 Send email to Recruiter
//             const recruiterMailOptions = {
//                 from: process.env.EMAIL_USER,
//                 to: job.company.userId.email, // Recruiter's email
//                 subject: `New Application for ${job.title}`,
//                 html: `
//                 <h2>Hi ${job.company.userId.name},</h2>
//                 <p>A new candidate <strong>${candidate.name}</strong> has applied for your job post: <strong>${job.title}</strong>.</p>
//                 <p>Login to your dashboard to view the applicant details.</p>
//             `
//             };

//             // Send both emails in parallel
//             await Promise.all([
//                 transporter.sendMail(candidateMailOptions),
//                 transporter.sendMail(recruiterMailOptions),
//             ]);

//             return res.status(200).json({ message: "Application submitted successfully", success: true });
//         } catch (error) {
//             console.error("Error in applyJob:", error);
//             res.status(500).json({ message: "Something went wrong", success: false });
//         }
//     };

// }

export const saveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        // Check if application already exists
        let application = await Application.findOne({ job: jobId, applicant: userId });

        if (application) {
            // If application exists, just update the save status
            application.isSaved = true;
            await application.save();
        } else {
            // Create a new record if not present
            application = await Application.create({
                job: jobId,
                applicant: userId,
                isSaved: true,
                isApplied: false
            });
        }

        return res.status(200).json({ message: "Job saved successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id;

        const savedApplications = await Application.find({ applicant: userId, isSaved: true })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                },
            });

        // Include isSaved and isApplied in the returned jobs
        const savedJobs = savedApplications.map(app => {
            const job = app.job.toObject(); // convert Mongoose doc to plain object
            job.isSaved = app.isSaved;
            job.isApplied = app.isApplied;
            return job;
        });

        return res.status(200).json({ savedJobs, success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to fetch saved jobs", success: false });
    }
};

// controllers/applicationController.js

export const unsaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }

        const application = await Application.findOne({ job: jobId, applicant: userId });

        if (!application) {
            return res.status(404).json({ message: "Saved job not found", success: false });
        }

        // Set isSaved to false
        application.isSaved = false;
        await application.save();

        return res.status(200).json({ message: "Job removed from saved list", success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};



// it will give number of applied jobs by candidate
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job', // we are populating the data from the job model and company model
            option: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                option: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(400).json({ message: "No application found", success: false });
        }
        return res.status(200).json({ message: "Application fetched successfully", success: true, application });
    } catch (error) {
        console.log(error);
    }
}

// it is used to get the list of applicants for a particular job in recruiter dashboard
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        if (!job) {
            return res.status(404).json({ message: "No job found", success: false });
        }

        return res.status(200).json({ message: "Applicants fetched successfully", success: true, job });

    } catch (error) {
        console.log(error);
    }
}


export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }
        // finding the application by application id
        const application = await Application.findOne({ _id: applicationId })

        if (!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }

        // update application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Application status updated successfully", success: true, application });
    } catch (error) {
        console.log(error);
    }
}