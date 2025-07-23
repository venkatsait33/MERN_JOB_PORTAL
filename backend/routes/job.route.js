import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAllJobs, getJobById, getRecruiterJobs, postJob, updateJob } from '../controllers/job.controller.js'
import { singleUpload } from "../utils/mutler.js";

const router = express.Router()

router.route('/post').post(isAuthenticated, postJob)
router.route('/:id/update').put(isAuthenticated, updateJob)
router.route('/get').get(getAllJobs)
router.route('/get/:id').get(getJobById)
router.route('/getrecruiterjobs').get(isAuthenticated, getRecruiterJobs)

export default router