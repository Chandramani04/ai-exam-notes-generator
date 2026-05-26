import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import MermaidSetup from "./MermaidSetup"; // Separately built component [57, 58]
import RechartSetup from "./RechartSetup"; // Separately built component [59, 60]
import { downloadPDF } from "../services/api.js"; // API function to trigger PDF [55]

// Custom formatting for ReactMarkdown to make the notes look clean [50, 51, 61]
const MarkdownComponent = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-semibold text-indigo-700 mt-6 mb-4 border-b pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-indigo-600 mt-5 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-6 space-y-1 text-gray-700">{children}</ul>
  ),
  li: ({ children }) => <li className="marker:text-indigo-500">{children}</li>,
};

// Reusable Section Header Component [62-64]
const SectionHeader = ({ icon, title, colorClass }) => (
  <div
    className={`mb-4 p-4 py-2 rounded-lg bg-gradient-to-r ${colorClass} font-semibold flex items-center gap-2`}
  >
    <span>{icon}</span>
    <span>{title}</span>
  </div>
);

const FinalResult = ({ result }) => {
  const [quickRevision, setQuickRevision] = useState(false); // [52]

  if (!result || !result.subTopics || !result.questions) return null; // [65]

  const handleDownloadPDF = async () => {
    try {
      await downloadPDF(result); // Trigger server-side PDF creation [55, 56]
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-6 p-3 space-y-10 bg-white">
      {" "}
      {/* [65] */}
      {/* Header & Buttons [52-54, 66, 67] */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
          📖 Generated Notes
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              quickRevision
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {quickRevision ? "Exit Revision Mode" : "Quick Revision 5 Mins"}
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
      {/* Sub Topics (Hidden during Quick Revision) [62-64, 68, 69] */}
      {!quickRevision && (
        <section>
          <SectionHeader
            icon="⭐"
            title="Sub Topics"
            colorClass="from-indigo-100 to-indigo-50 text-indigo-700"
          />
          <ul className="list-disc ml-6 text-gray-700">
            {Object.entries(result.subTopics).map(([star, topics]) =>
              topics.map((topic, idx) => (
                <li
                  key={`${star}-${idx}`}
                  className="font-medium text-indigo-600 mb-1"
                >
                  {topic}
                </li>
              )),
            )}
          </ul>
        </section>
      )}
      {/* Detailed Notes (Hidden during Quick Revision) [70, 71] */}
      {!quickRevision && (
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <SectionHeader
            icon="📝"
            title="Detailed Notes"
            colorClass="from-purple-100 to-purple-50 text-purple-700"
          />
          <ReactMarkdown components={MarkdownComponent}>
            {result.notes}
          </ReactMarkdown>
        </section>
      )}
      {/* Revision Points (Visible ONLY during Quick Revision) [71-73] */}
      {quickRevision && (
        <section className="rounded-xl bg-gradient-to-r from-green-100 to-green-50 border border-green-200 p-6">
          <h3 className="font-bold text-green-700 mb-3 text-lg">
            Exam Quick Revision Points
          </h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-800">
            {result.revisionPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>
      )}
      {/* Diagrams [74, 75] */}
      {result.diagram && result.diagram.data && (
        <section>
          <SectionHeader
            icon="📈"
            title="Diagram"
            colorClass="from-cyan-100 to-cyan-50 text-cyan-700"
          />
          <MermaidSetup diagram={result.diagram.data} />
          <p className="mt-3 text-xs text-gray-500 italic">
            *If you need this diagram for future reference and revision, you can
            save it by taking a screenshot.
          </p>
        </section>
      )}
      {/* Charts [76-78] */}
      {result.charts && result.charts.length > 0 ? (
        <section>
          <SectionHeader
            icon="📊"
            title="Visual Charts"
            colorClass="from-indigo-100 to-indigo-50 text-indigo-700"
          />
          <RechartSetup charts={result.charts} />
          <p className="mt-3 text-xs text-gray-500 italic">
            *If you need this chart for future reference, you can take a
            screenshot.
          </p>
        </section>
      ) : (
        <p className="text-sm text-gray-400 italic">
          Charts are not relevant for this topic.
        </p>
      )}
      {/* Important Questions (Always Visible) [79-82] */}
      <section>
        <SectionHeader
          icon="❓"
          title="Important Questions"
          colorClass="from-rose-100 to-rose-50 text-rose-700"
        />

        <div className="mb-4">
          <p className="font-medium text-sm text-gray-700 mb-1">
            Short Questions
          </p>
          <ul className="list-disc ml-6 text-gray-700 text-sm">
            {result.questions.short.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="font-medium text-sm text-gray-700 mb-1 mt-4">
            Long Questions
          </p>
          <ul className="list-disc ml-6 text-gray-700 text-sm">
            {result.questions.long.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>

        {result.questions.diagram && (
          <div>
            <p className="font-medium text-sm text-gray-700 mb-1 mt-4">
              Diagram Question
            </p>
            <ul className="list-disc ml-6 text-gray-700 text-sm">
              <li>{result.questions.diagram}</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default FinalResult;
