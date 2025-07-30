import { User } from "../models/user.model.js";
import { firebaseAdmin } from "../firebase/firebase.js";
import jwt from "jsonwebtoken";

export const firebaseLogin = async (req, res) => {
  const { token } = req.body;

  if (!token)
    return res.status(400).json({
      message: "Firebase token required",
    });

  try {
    const decodeToken = await firebaseAdmin.auth().verifyIdToken(token);
    const { uid, email, phone_number, name, picture } = decodeToken;

    let user = await User.findOne({
      $or: [{ firebaseUID: uid }, { email }],
    });

    const newUser = {
      firebaseUID: uid,
      email,
      phoneNumber: phone_number,
      fullname: name,
      profile: {
        profilePhoto: picture || "",
      },
      isAccountVerified: true,
    };

    if (!user) {
      user = new User({
        ...newUser,
      });
      await user.save();
    }

    // ✅ Generate JWT
    const jwtToken = jwt.sign(
      { userId: user._id, role: user.role }, // payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 days
    );

    // ✅ Set token in cookie
    res.cookie("token", jwtToken, {
      httpOnly: true, // ✅ Cannot access via JS
      secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Return user and token
    res.json({
      message: `welcome back ${user.fullname}`,
      user,
      token: jwtToken, // 👈 Also send token in JSON
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};
