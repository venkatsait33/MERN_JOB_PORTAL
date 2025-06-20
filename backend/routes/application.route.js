import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { applyJob, getApplicants, getAppliedJobs, getSavedJobs, saveJob, unsaveJob, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyJob)

router.route('/get').get(isAuthenticated, getAppliedJobs)

router.route('/:id/applicants').get(isAuthenticated, getApplicants)

router.route('/status/:id/update').post(isAuthenticated, updateApplicationStatus)

router.route('/save-job').post(isAuthenticated, saveJob)
router.route('/saved-jobs').get(isAuthenticated, getSavedJobs)
router.route('/unsave-job').post(isAuthenticated, unsaveJob)

export default router;