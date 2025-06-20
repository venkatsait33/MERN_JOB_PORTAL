import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // to prevent duplicate company names
    },
    description: {
        type: String,

    },
    website: {
        type: String,

    },
    location: {
        type: String
    },
    logo: {
        type: String // url of logo from cloudnary
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    })

export const Company = mongoose.model('Company', companySchema)