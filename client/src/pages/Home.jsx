import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Feature from "../components/Feature";
import image1 from "../assets/image1.png";
import examIcon from "../assets/book.png";
import notesIcon from "../assets/notes.png";
import diagramsIcon from "../assets/diagrams.png";
import pdfIcon from "../assets/pdf.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <Navbar />
      {/* Top Section (Hero Area) */}
      <section className="max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {" "}
        {/* [2] */}
        {/* Left Content (Text & Button) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ rotateX: 6, rotateY: -6 }}
          className="transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          {" "}
          {/* [3] */}
          <motion.h1
            whileHover={{ y: -4, translateZ: 40 }}
            className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black via-black/60 to-black/90 bg-clip-text text-transparent drop-shadow-[0_18px_14px_rgba(0,0,0,0.8)]"
          >
            {" "}
            {/* [4], [5] */}
            Create Smart <br /> AI Notes in Seconds {/* [6] */}
          </motion.h1>
          <motion.p
            whileHover={{ y: -2, translateZ: 40 }}
            className="mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent"
          >
            {" "}
            {/* [7], [8] */}
            Generate exam-focused notes, project documentation, flow diagrams,
            and revision-ready content using AI. Faster, cleaner, and smarter.{" "}
            {/* [8] */}
          </motion.p>
          <motion.button
            onClick={() => navigate("/notes")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 bg-gradient-to-br from-black/90 via-black/80 to-black/90 border border-white/10 text-white shadow-lg"
          >
            {" "}
            {/* [9], [10], [11], [12] */}
            Get Started
          </motion.button>
        </motion.div>
        {/* Right Content (Image) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -12, rotateX: 0, rotateY: -8, scale: 1.05 }}
          className="transform-gpu overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {" "}
          {/* [13] */}
          <img
            src={image1}
            alt="Image"
            style={{ transform: "translateZ(35px)" }}
          />{" "}
          {/* [14], [15] */}
        </motion.div>
      </section>
      {/* Bottom Section (Feature Boxes) */}
      <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-10">
        {" "}
        {/* [16] */}
        <Feature
          icon={
            <img
              src={examIcon}
              alt="Exam"
              className="h-10 w-10 object-contain"
            />
          }
          title="Exam Notes"
          description="High-yield exam-oriented notes with revision points."
        />{" "}
        {/* [17] */}
        <Feature
          icon={
            <img
              src={notesIcon}
              alt="Notes"
              className="h-10 w-10 object-contain"
            />
          }
          title="Project Notes"
          description="Well-structured content for assignments and projects."
        />{" "}
        {/* [16] */}
        <Feature
          icon={
            <img
              src={diagramsIcon}
              alt="Diagrams"
              className="h-10 w-10 object-contain"
            />
          }
          title="Diagrams & Charts"
          description="Auto-generated visual diagrams for clarity."
        />{" "}
        {/* [16] */}
        <Feature
          icon={
            <img src={pdfIcon} alt="PDF" className="h-10 w-10 object-contain" />
          }
          title="PDF Download"
          description="Download clean and printable PDFs instantly."
        />{" "}
        {/* [16] */}
      </section>
      {/* Footer Component */}
      <Footer /> {/* [18] */}
    </div>
  );
};

export default Home;
