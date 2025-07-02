import express from "express";
import { adminLogin, isUserAuthenticated, login, logout, register, registerAdmin, sendRestOtp, sendVerifyOtp, updateProfile, userRestPassword, verifyEmailWithOtp } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload } from "../utils/mutler.js";

const router = express.Router();

router.route('/register').post(singleUpload, register);
router.route('/admin').post(registerAdmin);
router.route('/admin/login').post(adminLogin)
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/updateProfile').post(isAuthenticated, singleUpload, updateProfile);

// ---------------------------------------------------------
router.route('/send-verification-otp').post(isAuthenticated, sendVerifyOtp);
router.route('/verify-otp').post(isAuthenticated, verifyEmailWithOtp);
router.route('/is-auth').post(isAuthenticated, isUserAuthenticated);
router.route('/send-rest-otp').post(sendRestOtp)
router.route('/rest-password').post(userRestPassword)
// ---------------------------------------------------------



export default router;