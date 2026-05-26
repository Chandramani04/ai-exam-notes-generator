import axios from "axios";
import { serverBaseUrl } from "../App.jsx";
import { setUserData } from "../redux/userSlice.js";


export async function getCurrentUser(dispatch) {
    try {
        const res = await axios.get(`${serverBaseUrl}/api/user/current`, { withCredentials: true });
        const data = res.data;
        // Only dispatch the user data, not the entire response
        if (data.success && data.user) {
            dispatch(setUserData(data.user));
        }
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(setUserData(null));
        return null;
    }
}

export async function generateNotes(payload) {
    /*
    data = {
        success: true,
        message: "Notes created successfully",
        notes: aiResponse,
        noteId: notes.id,
        credits: user.credits
    }
    */
    try {
        const result = await axios.post(`${serverBaseUrl}/api/notes/generateNotes`, payload, { withCredentials: true });
        console.log("API Response:", result.data); 
        return result.data;
    } catch (error) {
        console.error("Error generating notes:", error);
        return null;
    }
}