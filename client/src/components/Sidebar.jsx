import React from "react";

const Sidebar = ({ result }) => {
  // Prevent rendering if essential data is missing [31, 32]
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">
      {" "}
      {/* [32] */}
      {/* Header [33, 34] */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📌</span>
        <h3 className="text-lg font-semibold text-indigo-600">
          Quick Exam View
        </h3>
      </div>
      {/* Starred Subtopics Priority Wise [35-40] */}
      <section>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Star Sub Topics Priority Wise
        </p>

        {Object.entries(result.subTopics).map(([star, topics], index) => (
          <div
            key={index}
            className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
          >
            <p className="text-sm font-semibold text-yellow-600 mb-1">
              {star} Priority
            </p>
            <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
              {topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* Important Questions Section [41-44] */}
      <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
        <p className="text-sm font-semibold text-yellow-700 mb-1">
          Exam Important Questions
        </p>
        <span className="text-sm font-bold text-yellow-700">
          {result.questions.important || "★★★"}
        </span>
      </div>
      {/* Short Questions [44, 45] */}
      <div className="mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3 pt-2">
        <p className="text-sm font-semibold text-indigo-700 mb-2">
          Short Questions
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
          {result.questions.short.map((question, i) => (
            <li key={i}>{question}</li>
          ))}
        </ul>
      </div>
      {/* Long Questions [45, 46] */}
      <div className="mb-4 rounded-lg bg-purple-50 border border-purple-200 p-3 pt-2">
        <p className="text-sm font-semibold text-purple-700 mb-2">
          Long Questions
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
          {result.questions.long.map((question, i) => (
            <li key={i}>{question}</li>
          ))}
        </ul>
      </div>
      {/* Diagram Question [46, 47] */}
      {result.questions.diagram && (
        <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3 pt-2">
          <p className="text-sm font-semibold text-blue-700 mb-2">
            Diagram Question
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
            <li>{result.questions.diagram}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
