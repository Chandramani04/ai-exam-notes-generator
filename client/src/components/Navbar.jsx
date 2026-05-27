import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverBaseUrl } from "../App";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve user data and credits from Redux global state
  const userData = useSelector((state) => state.user.userData);
  const credits = userData?.credit || 0;

  // Handle User Sign Out
  const handleSignOut = async () => {
    try {
      await axios.post(serverBaseUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative z-20 mx-6 mt-6 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] px-8 py-4 flex justify-between items-center"
    >
      {/* Left Content - Logo & Brand Name */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
        <span className="text-lg font-semibold text-white hidden md:block">
          Exam Notes <span className="text-gray-400">AI</span>
        </span>
      </div>

      {/* Right Content - Credits & User Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Credits Button */}
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setShowCredits(!showCredits);
            if (showProfile) setShowProfile(false);
          }}
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm shadow-md cursor-pointer"
        >
          <span className="text-xl">💎</span>
          <span>{credits}</span>
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="ml-2 w-5 h-5 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold"
          >
            +
          </motion.span>
        </motion.div>

        {/* Credits Dropdown */}
        <AnimatePresence>
          {showCredits && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-10 w-64 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-50"
            >
              <h4 className="font-semibold mb-2">💎 Credits</h4>
              <p className="text-sm text-gray-300 mb-4">
                Use credits to generate AI Notes, Diagrams, and PDFs.
              </p>
              <button
                onClick={() => {
                  setShowCredits(false);
                  navigate("/pricing");
                }}
                className="w-full py-2 rounded-lg bg-gradient-to-br from-white via-gray-300 to-black text-black font-semibold hover:opacity-90 transition-opacity"
              >
                Buy More Credits
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Profile Initial Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowProfile(!showProfile);
            if (showCredits) setShowCredits(false);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white text-lg font-semibold cursor-pointer"
        >
          {userData?.name?.slice(0, 1).toUpperCase()}
        </motion.div>

        {/* Profile Dropdown */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 w-52 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-2 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-50"
            >
              <div
                onClick={() => {
                  setShowProfile(false);
                  navigate("/history");
                }}
                className="w-full text-left px-5 py-3 text-sm text-gray-200 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
              >
                History
              </div>

              <div className="h-px bg-white/10 my-1 mx-3" />

              <div
                onClick={handleSignOut}
                className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-white/10 hover:text-red-400 rounded-lg cursor-pointer transition-colors"
              >
                Sign Out
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
