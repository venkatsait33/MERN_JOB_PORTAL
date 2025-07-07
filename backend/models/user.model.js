import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter', "admin"],
        default: 'candidate',
    },
    firebaseUID: { type: String, unique: true, sparse: true },
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