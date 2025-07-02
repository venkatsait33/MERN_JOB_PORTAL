import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    requirements: [{ type: String }],
    department: {
        type: String,
        required: true
    },
    category: {
        type: String,

    },
     jobType: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobShifts: {
        type: String,
        required: true
    },
      experience: {
        type: Number,
        required: true,
    },   
    education: {
        type: String,
        required: true
    },
    englishLevel: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
     positions: {
        type: Number,
        required: true
    },
    visible: {
        type: Boolean,
        default: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }],

},
    {
        timestamps: true
    })

export const Job = mongoose.model('Job', jobSchema)