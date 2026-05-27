import { generateToken } from "../lib/auth.js";
import UserModel from "../models/user.model.js";

export async function googleAuth(req, res) {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }

        let dbUser = await UserModel.findOne({ email })
        if (!dbUser) {
            dbUser = await UserModel.create({
                name, email
            })
        }
        const token = generateToken({ userid: dbUser._id });

        // precompute secure and sameSite values based on environment


        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/", // ensure cookie is sent in all requests to the server
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
            success: true,
            message: "Google Auth successful",
            user: {
                name: dbUser.name,
                email: dbUser.email,
            },
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during Google Auth",
        });
    }
}

export async function logout(req, res) {

    try {
        // delete token  
        await res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        // send response 
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during logout"
        });
    }

}