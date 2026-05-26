import notesModel from "../models/notes.model.js";


export async function getMyNotes(req, res) {
    try {
        const userId = req.userid;
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "invalid userid"
            })
        }
        // out of all notes , get notes of current user 
        const notes = await notesModel.find({ user: userId })
            .select("topic classLevel examType revisionMode includeDiagram includeCharts createdAt")
            .sort({ createdAt: -1 });

        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notes fetched successfully",
            notes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching notes"
        });
    }

}

export async function getSingleNote(req, res) {
    try {
        const noteId = req.params.id;
        const userId = req.userid;
        const note = await notesModel.findOne({
            _id: noteId,
            user: userId
        });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Note fetched successfully",
            content: note.content,
            topic: note.topic,
            createdAt: note.createdAt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching note"
        });
    }
}