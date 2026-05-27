import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { serverBaseUrl } from "../App";
import logo from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sign out logic implemented directly in the footer
  const handleSignOut = async () => {
    try {
      await axios.post(
        serverBaseUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative z-20 mx-6 mb-6 mt-24 rounded-2xl bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-2xl border border-white/10 px-8 py-8 shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Column 1: Brand & Description */}
        <motion.div
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="flex flex-col gap-4 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="flex items-center gap-3 cursor-pointer"
            style={{ transform: "translateZ(20px)" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
            <span className="text-xl font-semibold bg-gradient-to-br from-white via-gray-300 to-white bg-clip-text text-transparent drop-shadow-[0_16px_18px_rgba(0,0,0,0.8)]">
              Exam Notes <span className="text-gray-400">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-500 max-w-sm">
            Exam Notes AI helps students generate exam-focused notes, revision
            modules, diagrams, and printable PDFs using AI.
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/notes")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Notes
            </li>
            <li
              onClick={() => navigate("/history")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              History
            </li>
            <li
              onClick={() => navigate("/pricing")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </li>
          </ul>
        </div>

        {/* Column 3: Support & Account */}
        <div className="text-center md:text-left">
          <h3 className="text-sm font-semibold text-white mb-4">
            Support & Account
          </h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/auth")}
              className="text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </li>
            <li
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              Sign Out
            </li>
            <li className="text-gray-300">support@examnotesai.com</li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="h-px w-full bg-white/10 my-6" />
      <p className="text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Exam Notes AI. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
