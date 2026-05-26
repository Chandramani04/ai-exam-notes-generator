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

export async function downloadPDF(result) {
    try {
        const res = await axios.post(`${serverBaseUrl}/api/pdf/generatePdf`, { result }, { withCredentials: true , responseType: 'blob' });
        const data = res.data;

        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'notes.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);


    } catch (error) {
        console.log("Error downloading PDF:", error);
        return null;
    }
}
