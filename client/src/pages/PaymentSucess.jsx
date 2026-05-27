import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa"; // [4]
import { getCurrentUser } from "../services/api.js"; // [3]

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Re-fetch user data to immediately update global credits [3]
    getCurrentUser(dispatch);

    // Set a timer to navigate back to Home after 5 seconds [2]
    const t = setTimeout(() => {
      navigate("/"); // [5]
    }, 2000);

    // Cleanup the timeout if the component unmounts [5]
    return () => clearTimeout(t);
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      {" "}
      {/* [6, 7] */}
      {/* Animated Check Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }} // [4]
        animate={{ scale: 1, rotate: 360 }} // [4]
        transition={{ duration: 0.8, ease: "easeOut" }} // [4]
        className="text-green-500 text-6xl" // [4]
      >
        <FaCheckCircle />
      </motion.div>
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }} // [8, 9]
        animate={{ opacity: 1, y: 0 }} // [9]
        transition={{ delay: 0.3 }} // [9]
        className="text-2xl font-bold text-green-500" // [9]
      >
        Payment Successful! Credits Added. {/* [9] */}
      </motion.h1>
      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0 }} // [9]
        animate={{ opacity: 1 }} // [9]
        transition={{ delay: 0.6 }} // [9]
        className="text-gray-500 text-sm" // [3]
      >
        Redirecting to Home... {/* [3] */}
      </motion.p>
    </div>
  );
};

export default PaymentSuccess;
