import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        const existingCompany = await Company.findOne({ name: companyName });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company already exists",
                success: false,
            });
        }

        const company = await Company.create({
            name: companyName,
            userId: req.id,
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: error.message,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const company = await Company.find({ userId });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            success: true,
            company,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId).lean();
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        const jobs = await Job.find({ company: companyId })
            .select("-__v") // exclude __v field
            .lean();

        // Attach jobs to company object
        company.jobs = jobs;

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body;

        const file = req.file;
        // cloudinary for upload logo

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {
            name, description, website, location, logo
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
            new: true
        })

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }

        return res.status(201).json({
            message: "Company information updated ",
            success: true,
        })


    } catch (error) {
        console.log(error);
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid company ID"
            });
        }

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }
        const jobs = await Job.find({ company: companyId }).lean();
        const jobIds = jobs.map(job => job._id);
        //  Delete all applications related to these jobs
        const deletedApplications = await Application.deleteMany({ job: { $in: jobIds } });

        //  Delete all jobs related to this company
        const deletedJobs = await Job.deleteMany({ company: companyId });

        //  Finally delete the company
        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            success: true,
            message: "Company,related jobs & applications deleted successfully"
        });

    } catch (error) {
        console.log(error);
    }
}
