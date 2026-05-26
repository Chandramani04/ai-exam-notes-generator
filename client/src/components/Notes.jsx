import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";
import logo from "../assets/logo.png";

const Notes = () => {
  const navigate = useNavigate();

  // Retrieve global user data and credits
  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credit || 0;

  // Manage API response states [1, 2]
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">
      {" "}
      {/* [3] */}
      {/* Custom Header for the Notes Page [4] */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        {/* Left Side: Brand Logo & Name [5] */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
          <span className="text-lg font-semibold text-white hidden md:block">
            Exam Notes <span className="text-gray-400">AI</span>
          </span>
        </div>

        {/* Right Side: Credits & History Buttons [6-8] */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-lg">💎</span>
            <span>{credits}</span>
            <span className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
              +
            </span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span>📖</span> Your Notes
          </button>
        </div>
      </motion.div>
      {/* Main Topic Form Component [9, 10] */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />
      </motion.div>
      {/* Loading & Error Indicators [11, 12] */}
      {loading && (
        <div className="text-center text-black font-medium mb-6 animate-pulse">
          Generating Exam Force Notes...
        </div>
      )}
      {error && (
        <div className="mb-6 text-center text-red-600 font-medium">{error}</div>
      )}
      {/* Empty State Placeholder (Shows when no results and not loading) [13, 14] */}
      {!result && !loading && (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border border-dashed border-gray-300 text-gray-500 shadow-inner"
        >
          <span className="text-4xl mb-3">📖</span>
          <p className="text-sm">Generated notes will appear here</p>
        </motion.div>
      )}
      {/* Results Section [15-17] */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:grid lg:grid-cols-4 gap-6"
          >
            {/* Left Column: Sidebar Component (1 Column wide on Large Screens) */}
            <div className="lg:col-span-1">
              <Sidebar result={result} />
            </div>

            {/* Right Column: Final Result Component (3 Columns wide on Large Screens) */}
            <div className="lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] p-6">
              <FinalResult result={result} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notes;
