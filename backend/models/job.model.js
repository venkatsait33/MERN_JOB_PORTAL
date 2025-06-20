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
    salary: {
        type: String,
        required: true
    },
    location: {
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
    positions: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true,
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