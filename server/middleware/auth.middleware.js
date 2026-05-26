import {verifyToken } from "../lib/auth.js";


export async function validateLogin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "user not logged in"
            })
        }
        const payload = verifyToken(token);
        if (!payload.userid) {
            return res.status(403).json({
                success: false,
                message: "Invalid token. Please login again."
            })
        }

        // payload.id = mongodb _id of user
        // attach user information to req object 
        
        // since payload is verified , we can trust that the userid present in payload is correct and actually exists in our database. 

        req.userid = payload.userid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}