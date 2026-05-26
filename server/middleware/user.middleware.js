import UserModel from "../models/user.model.js";

export async function getCurrentUser(req, res) {
    try {
        const userid = req.userid;
        const dbUser = await UserModel.findById(userid);
        if (!dbUser) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user found",
            user: {
                name: dbUser.name,
                email: dbUser.email,
                id: dbUser._id,
                credit: dbUser.credits,
                isCreditAvailable: dbUser.isCreditAvailable,
                notes: dbUser.notes
            }
        })
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}