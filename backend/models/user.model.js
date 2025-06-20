import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter', "admin"],
        default: 'candidate',
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        }
    },
    verifyOtp: {
        type: String, default: ''
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },  
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordOtp: {
        type: String, default: ''
    },
    restOtpExpireAt: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema)