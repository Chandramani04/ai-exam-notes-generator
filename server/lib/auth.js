import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.model.js";

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function verifyPassword(password, hash) {
    try {
        const res = await bcrypt.compare(password, hash);
        return res;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export function generateToken(payload) {
    try {
        // payload will be an object 
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}
export function verifyToken(token) {
    try {
        const res = jwt.verify(token, process.env.JWT_SECRET);
        return res; // res is decoded result from token 
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

