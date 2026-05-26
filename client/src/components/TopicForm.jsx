import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";
import { generateNotes } from "../services/api.js";
import { updateUserCredit } from "../redux/userSlice.js";

const TopicForm = ({ loading, setResult, setLoading, setError }) => {
  const dispatch = useDispatch();

  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");

  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim() || !classLevel.trim() || !examType.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeCharts,
      };

      const data = await generateNotes(payload);

      if (data.success) {
        setResult(data.notes);
      } else {
        setError(data.message || "Failed to generate notes. Please try again.");
      }
      setLoading(false);

      // update user credits in Redux store after successful generation
      if (data.success && typeof data.credits === "number") {
        // dispatch an action to update credits in the Redux store
        dispatch(updateUserCredit(data.credits));
      }

      // reset form fields after submission
      setTopic("");
      setClassLevel("");
      setExamType("");
      setRevisionMode(false);
      setIncludeDiagram(false);
      setIncludeCharts(false);
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating notes. Please try again.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-black/90 via-black/80
      to-black/90 backdrop-blur-2xl border border-white/10
      shadow-[0_20px_45px_rgba(0,0,0,0.8)] p-8 space-y-6 text-white"
    >
      {/* Form fields for topic, class level, and exam type */}
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Topic (e.g. Web Development)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring ring-white/30"
      />
      <input
        type="text"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        placeholder="Class / Level (e.g. Class 12th)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring ring-white/30"
      />
      <input
        type="text"
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
        className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring ring-white/30"
      />
      {/* Toggles */}
      <div className="flex flex-col md:flex-row gap-6">
        <Toggle
          label="Exam Revision Mode"
          checked={revisionMode}
          onChange={() => setRevisionMode(!revisionMode)}
        />
        <Toggle
          label="Include Diagram"
          checked={includeDiagram}
          onChange={() => setIncludeDiagram(!includeDiagram)}
        />
        <Toggle
          label="Include Charts"
          checked={includeCharts}
          onChange={() => setIncludeCharts(!includeCharts)}
        />
      </div>
      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-gradient-to-br from-white via-gray-200 to-white text-black shadow-lg"
        }`}
      >
        {loading ? "Generating..." : "Generate Notes"}
      </motion.button>
    </motion.div>
  );
};

const Toggle = ({ label, checked, onChange }) => {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none"
      onClick={onChange}
    >
      <motion.div
        className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
        animate={{
          backgroundColor: checked ? "rgb(34, 197, 94)" : "rgb(107, 114, 128)",
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ left: checked ? "1.6rem" : "0.25rem" }}
        />
      </motion.div>
      <span
        className={`text-sm transition-colors ${checked ? "text-green-500" : "text-gray-400"}`}
      >
        {label}
      </span>
    </div>
  );
};

export default TopicForm;
