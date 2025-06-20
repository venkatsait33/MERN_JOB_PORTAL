import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { getAllRecruiterDataForAdmin } from "../controllers/admin.controller.js";


const router = express.Router();

router.get(
    "/recruiters-jobs-candidates",
    isAuthenticated,
    authorizeRoles("admin"),
    getAllRecruiterDataForAdmin
);

export default router;