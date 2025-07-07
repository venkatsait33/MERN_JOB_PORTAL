import jwt from "jsonwebtoken";
import { firebaseAdmin } from "../firebase/firebase.js";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        let token;

        // ✅ 1. Check cookie token (for normal login)
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // ✅ 2. Fallback: Check Authorization header (for Firebase login)
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        let user;

        try {
            // ✅ First try verifying JWT (normal login)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.id = decoded.userId; // MongoDB _id
            user = await User.findById(req.id).select("role");
        } catch (err) {
            // 🔥 If JWT fails, try verifying Firebase token
            console.log("JWT verification failed, trying Firebase token...");
            const firebaseDecoded = await firebaseAdmin.auth().verifyIdToken(token);

            req.id = firebaseDecoded.uid; // Firebase UID

            // 🔥 Find user in DB by firebaseUID
            user = await User.findOne({ firebaseUID: firebaseDecoded.uid }).select("role");
        }

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        // ✅ Attach role for authorizeRoles
        req.user = { role: user.role };

        next();

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export default isAuthenticated;
