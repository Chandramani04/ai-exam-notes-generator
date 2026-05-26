import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    // Links the note to the specific user who generated it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },

    // The main subject of the notes
    topic: {
        type: String,
        required: true
    },

    // E.g., Class 12th, B.Tech 3rd Year
    classLevel: {
        type: String
    },

    // E.g., CBSE, NEET, JEE
    examType: {
        type: String
    },

    // Formats the output strictly into bullet points for quick reading
    revisionMode: {
        type: Boolean,
        default: false
    },

    // Determines if mermaid.js block diagrams are generated
    includeDiagram: {
        type: Boolean,
        default: false
    },

    // Determines if recharts data (pie/bar/line) are generated
    includeCharts: {
        type: Boolean,
        default: false
    },

    // Stores the entire JSON response returned by the Gemini API
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

const notesModel = mongoose.model('notesModel', notesSchema);

export default notesModel;