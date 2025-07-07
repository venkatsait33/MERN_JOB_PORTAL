import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import transporter from '../utils/nodemailer.js'
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../utils/emailTemplates.js";
import { getUserByIdOrFirebaseUID } from "../middleware/getuserbyidorfirebase.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: 'User already exists',
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        })

        // Welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our platform',
            html: `<h1>Welcome to our platform</h1> <p>Thank you for joining our platform. We hope you enjoy your experience with us .</p>
            <p> Your account has been created with email id: ${email}
            </p>`
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            message: 'User created successfully',
            success: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: error.message
        })
    }
}

export const registerAdmin = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role: "admin"
        });

        res.status(201).json({ message: "Admin registered", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        const tokenData = {
            userId: user._id,
            role: user.role
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })

        user = {
            _id: user._id,
            email: user.email,
            role: user.role,
            fullname: user.fullname
        }

        return res.status(200).cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        };
        let user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: 'Incorrect Email or Password',
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: 'Incorrect Email or Password',
                success: false
            })
        }
        //check role is correct or not

        if (role !== user.role) {
            return res.status(400).json({
                message: 'Account is not available for this role',
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
            role: user.role
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            isAccountVerified: user?.isAccountVerified,

        }

        return res.status(200).cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', null, { maxAge: 0 }).json({
            message: 'Logged out successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // ✅ Corrected destructuring

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(',');
        }

        const user = await getUserByIdOrFirebaseUID(req.id);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: 'auto',
                public_id: `resume_${user._id}`,
            });

            if (cloudResponse) {
                // Replace image with raw just in case
                const pdfUrl = cloudResponse.secure_url.replace('/image/', '/raw/');

                user.profile.resume = pdfUrl;  // use this to render or download
                user.profile.resumeOriginalName = file.originalname;
            }

        }

        await user.save();

        const formattedUser = {
            _id: user._id,
            name: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        };

        return res.status(200).json({
            message: 'User Profile updated successfully',
            success: true,
            user: formattedUser
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

export const updateUserStatus = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User status updated", user });
};

export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.isAccountVerified) {
            return res.status(400).json({ message: "Account already verified", success: false });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Verify Your Account",

            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: "OTP sent to your email", success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const verifyEmailWithOtp = async (req, res) => {
    const userId = req.id;
    const { otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({ message: "Please provide all fields", success: false });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({ message: "OTP expired", success: false });
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.status(200).json({ message: "Email verified successfully", success: true, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const isUserAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({ message: "User is authenticated", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const sendRestOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required", success: false });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetPasswordOtp = otp;
        user.restOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Rest OTP ",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
            // `<p>Your OTP for resetting your password is: ${otp}</p> <p>This OTP will expire in 15 minutes</p>`

        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const userRestPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
        return res.status(400).json({ message: "Please provide all fields", success: false });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        if (user.resetPasswordOtp === "" || user.resetPasswordOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }
        if (user.restOtpExpireAt < Date.now()) {
            return res.status(400).json({ message: "OTP expired", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordOtp = "";
        user.restOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully", success: true });

    } catch {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}
