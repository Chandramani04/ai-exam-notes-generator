import UserModel from "../models/user.model.js";
import { buildPrompt } from "../lib/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import notesModel from "../models/notes.model.js";

export async function generateNotes(req, res) {
    const { topic, classLevel, examType, revisionMode = false, includeDiagram = false, includeCharts = false } = req.body;
    if (!topic) {
        return res.status(400).json({
            success: false,
            message: "Topic is required",
        });
    }

    const user = await UserModel.findById(req.userid);
    if (!user) {
        return res.status(404).json({
            success: false,
            mesage: "No user found , please login first"
        })
    }
    if (user.credits < 10) {
        user.isCreditAvailable = false;
        await user.save();
        return res.status(403).json({
            success: false,
            message: "Insufficient credits"
        })
    }

    const prompt = buildPrompt({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart: includeCharts
    })

    const aiResponse = await generateGeminiResponse(prompt)
    // console.log("AI Response:", aiResponse); 

    // save the generated notes to database and link it to user
    const notes = await notesModel.create({
        user: user._id,
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeCharts,
        content: aiResponse
    })


    user.credits -= 10; // deduct 10 credits for generating notes
    if (user.credits <= 0) user.isCreditAvailable = false;

    if (!Array.isArray(user.notes)) { // if user's notes field is not an array, initialize it as an empty array
        user.notes = []
    }
    user.notes.push(notes._id); // push the generated notes id to user's notes array

    await user.save(); // save the updated user document with new credits and notes

    return res.status(201).json({
        success: true,
        message: "Notes created successfully",
        notes: aiResponse,
        noteId: notes.id,
        credits: user.credits
    })
}