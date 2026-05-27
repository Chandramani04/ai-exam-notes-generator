import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // [10]

const PaymentField = () => {
  // [5]
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate back to Home after 5 seconds [11]
    const t = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      {/* Animated Cross Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-red-500 text-6xl" // Changed to red [10]
      >
        <FaTimesCircle /> {/* [10] */}
      </motion.div>

      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-red-500" // Changed to red [11]
      >
        Payment Failed {/* [10] */}
      </motion.h1>

      {/* Animated Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-gray-500 text-sm"
      >
        Redirecting to Home...
      </motion.p>
    </div>
  );
};

export default PaymentField;
