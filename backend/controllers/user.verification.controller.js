import { User } from "../models/user.model.js";

export const getUserData = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            success: true, userData: {
                name: user.fullname,
                isAccountVerified: user.isAccountVerified,
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}