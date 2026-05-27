import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { serverBaseUrl } from "../App";
import FinalResult from "../components/FinalResult";
import logo from "../assets/logo.png";
import { FaBars, FaTimes, FaPlus } from "react-icons/fa";

const History = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credit || 0;

  // State Management
  const [topics, setTopics] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024); // Open by default on larger screens
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Fetch All Notes on Page Load
  useEffect(() => {
    const myNotes = async () => {
      try {
        const response = await axios.get(
          serverBaseUrl + "/api/notes/getNotes",
          {
            withCredentials: true,
          },
        );
       

        // Ensure the response data is an array
        if (Array.isArray(response.data?.notes)) {
          setTopics(response.data.notes);
        } else {
          setTopics([]);
        }
      } catch (error) {
        console.log("Get current user notes error", error);
      }
    };

    myNotes();
  }, []);

  // Ensure sidebar is open by default on larger screens with useEffect to avoid state update on every render
  // useEffect(() => {
  //     if (window.innerWidth > 1024) {
  //     setIsSidebarOpen(true);
  //     }
  // }, []);

  // 2. Fetch Single Note Data when a topic is clicked
  const openNotes = async (noteId) => {
    try {
      setLoading(true);
      const url = `${serverBaseUrl}/api/notes/${noteId}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });

      // Update state with the specific note's deeply nested JSON content
      setSelectedNote(response.data.content);
      setActiveNoteId(noteId);

      // Close sidebar on mobile after selection
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
      setLoading(false);
    } catch (error) {
      console.log("Get single notes error", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">
      {/* Custom Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-4 z-20 relative"
      >
        <div className="flex items-center gap-4">
          {/* Hamburger Menu (Mobile/Tablet Only) */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars />
          </button>

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src={logo} alt="logo" className="h-9 w-9 object-contain" />
            <span className="text-lg font-semibold text-white hidden md:block">
              Exam Notes <span className="text-gray-400">AI</span>
            </span>
          </div>
        </div>

        {/* Right Side: Credits & New Note Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/pricing")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm"
          >
            <span className="text-lg">💎</span>
            <span>{credits}</span>
          </button>
        </div>
      </motion.header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
        {/* Sidebar for History List */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth > 1024) && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed lg:static top-0 left-0 z-50 h-full lg:h-[75vh] w-72 lg:w-auto lg:col-span-1 bg-black/90 lg:bg-black/80 backdrop-blur-xl border border-white/10 rounded-r-3xl lg:rounded-3xl p-5 shadow-2xl overflow-y-auto overflow-x-hidden"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }} // Hide scrollbar
            >
              {/* Close Button for Mobile Sidebar */}
              <button
                className="lg:hidden text-white mb-6 text-xl"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes /> Back
              </button>

              <button
                onClick={() => navigate("/notes")}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm transition-colors mb-6"
              >
                <FaPlus /> New Notes
              </button>

              <div className="h-px w-full bg-white/10 mb-6" />

              <h2 className="text-lg font-bold bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent mb-4">
                Your Notes
              </h2>

              {topics.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No notes created yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {topics.map((t, i) => (
                    <li
                      key={i}
                      onClick={() => openNotes(t._id)}
                      className={`cursor-pointer rounded-xl p-4 transition-colors ${
                        activeNoteId === t._id
                          ? "bg-indigo-600 border border-indigo-400 shadow-md"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm font-semibold text-white mb-2">
                        {t.topic}
                      </p>

                      {/* Tags for Class & Exam Type */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {t.classLevel && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                            {t.classLevel}
                          </span>
                        )}
                        {t.examType && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                            {t.examType}
                          </span>
                        )}
                      </div>

                      {/* Icons for Features Included */}
                      <div className="flex gap-3 mt-3 text-xs text-gray-400">
                        {t.revisionMode && (
                          <span className="flex items-center gap-1">
                            ⚡ Rev
                          </span>
                        )}
                        {t.includeDiagram && (
                          <span className="flex items-center gap-1">
                            📈 Diag
                          </span>
                        )}
                        {t.includeCharts && (
                          <span className="flex items-center gap-1">
                            📊 Chart
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Render the Selected Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 min-h-[75vh] rounded-3xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.1)] p-6 md:p-8"
        >
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-500 animate-pulse font-medium">
              Loading Notes...
            </div>
          ) : !selectedNote ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-4xl mb-3">👈</span>
              <p>Select a topic from the side bar</p>
            </div>
          ) : (
            <FinalResult result={selectedNote} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default History;
