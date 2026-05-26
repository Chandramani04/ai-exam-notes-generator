import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
    // Read the generated content sent from the client.
    const result = req.body.result;

    // Guard against empty payloads.
    if (!result) {
        return res.status(400).json({ message: "No content provided" });
    }
    // Create the PDF instance and configure download headers.
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        'attachment; filename="Exam_Notes_AI.pdf"'
    );

    // Stream PDF content to the HTTP response.
    doc.pipe(res);

    // Title section.
    doc.fontSize(20).text("Exam Notes AI", { align: "center" });
    doc.moveDown();

    // Highlight any important question summary if present.
    if (result.questions && result.questions.important) {
        doc.fontSize(14).text(`Important: ${result.questions.important}`);
        doc.moveDown();
    }

    // Subtopics grouped by importance.
    if (result.subTopics) {
        doc.fontSize(16).text("Sub Topics");
        doc.moveDown(0.5);

        Object.entries(result.subTopics).forEach(([star, topics]) => {
            doc.fontSize(13).text(`${star} Priority:`);
            topics.forEach((topic) => {
                doc.fontSize(12).text(`• ${topic}`);
            });
            doc.moveDown(0.5);
        });
        doc.moveDown();
    }

    // Notes section with cleaned markdown symbols.
    if (result.notes) {
        doc.fontSize(16).text("Notes");
        doc.moveDown(0.5);

        const cleanNotes = result.notes.replace(/\*/g, "").replace(/#/g, "");
        doc.fontSize(12).text(cleanNotes);
        doc.moveDown();
    }

    // Revision points for quick recap.
    if (result.revisionPoints && result.revisionPoints.length > 0) {
        doc.fontSize(16).text("Revision Points");
        doc.moveDown(0.5);

        result.revisionPoints.forEach((point) => {
            doc.fontSize(12).text(`• ${point}`);
        });
        doc.moveDown();
    }

    // Question bank section (short, long, diagram).
    if (result.questions) {
        if (result.questions.short && result.questions.short.length > 0) {
            doc.fontSize(16).text("Short Questions");
            doc.moveDown(0.5);
            result.questions.short.forEach((q) => {
                doc.fontSize(12).text(`• ${q}`);
            });
            doc.moveDown();
        }
        if (result.questions.long && result.questions.long.length > 0) {
            doc.fontSize(16).text("Long Questions");
            doc.moveDown(0.5);
            result.questions.long.forEach((q) => {
                doc.fontSize(12).text(`• ${q}`);
            });
            doc.moveDown();
        }
        if (result.questions.diagram) {
            doc.fontSize(16).text("Diagram Question");
            doc.moveDown(0.5);
            doc.fontSize(12).text(`• ${result.questions.diagram}`);
            doc.moveDown();
        }
    }

    // Finalize the PDF stream.
    doc.end();
};