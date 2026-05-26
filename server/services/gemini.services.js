import dotenv from "dotenv"

dotenv.config();    

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent"
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

console.log("GEMINI_API_KEY from gemini.services.js:", process.env.GEMINI_API_KEY);

export const generateGeminiResponse = async (prompt) => {
    try {
        const url = `${GEMINI_URL}?key=${GEMINI_API_KEY}`

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        })

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error("No text returned from GEMINI");
        }

        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim(); // remove code block markers if present
        return JSON.parse(cleanedText); // parse the cleaned text as JSON and return because cleanedText is a string but we want to return an object

    } catch (error) {
        console.error("Error generating GEMINI response:", error);
        throw error;
    }

}