import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    requirements: [{ type: String }],
    department: {
      type: String,
    },
    category: {
      type: String,
    },
    jobType: {
      type: String,
    },
    salary: {
      type: String,
    },
    location: {
      type: String,
    },
    jobShifts: {
      type: String,
    },
    experience: {
      type: Number,
    },
    education: {
      type: String,
    },
    englishLevel: {
      type: String,
    },
    gender: {
      type: String,
    },
    positions: {
      type: Number,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
