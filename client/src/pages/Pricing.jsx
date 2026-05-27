import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverBaseUrl } from "../App";
import { FaArrowLeft, FaCheck } from "react-icons/fa";

const PricingCard = ({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  isPaying,
  payingAmount,
}) => {
  const isSelected = selectedPrice === amount;
  const isPayingThisCard = isPaying && payingAmount === amount;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={() => setSelectedPrice(amount)}
      className={`relative cursor-pointer rounded-xl p-6 bg-white border transition-all ${
        isSelected
          ? "border-black"
          : popular
            ? "border-indigo-600"
            : "border-gray-200"
      }`}
    >
      {popular && !isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-indigo-600 text-white">
          Popular
        </span>
      )}
      {isSelected && (
        <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded bg-black text-white">
          Selected
        </span>
      )}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
      <div className="mt-4">
        <p className="text-3xl font-bold">{price}</p>
        <p className="text-sm text-indigo-600">{credits} Credits</p>
      </div>
      <button
        disabled={isPayingThisCard}
        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount);
        }}
        className={`w-full mt-5 py-2 rounded-lg font-medium transition-colors ${
          isPayingThisCard
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : isSelected
              ? "bg-black text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </button>
      <ul className="mt-5 space-y-2 text-sm text-gray-600">
        {features.map((f, index) => (
          <li key={index} className="flex gap-2 items-center">
            <span className="text-green-600">
              <FaCheck />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Pricing = () => {
  const navigate = useNavigate();

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount);
      setIsPaying(true);
      const result = await axios.post(
        serverBaseUrl + "/api/credits/order",
        { amount },
        { withCredentials: true },
      );

      if (result.data.url) {
        window.location.href = result.data.url;
      }
      setIsPaying(false);
    } catch (error) {
      console.log(error);
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6"
      >
        <FaArrowLeft /> Back
      </button>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl font-bold">Buy Credits</h1>
        <p className="text-gray-600 mt-2">
          Choose a plan that fits your study needs
        </p>
      </motion.div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits={50}
          description="Perfect for quick revision"
          features={[
            "Generate AI Notes",
            "Exam focused answers",
            "Diagram & chart support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          isPaying={isPaying}
          payingAmount={payingAmount}
        />
        <PricingCard
          title="Popular"
          price="₹200"
          amount={200}
          credits={120}
          description="Best value for student"
          features={[
            "Generate AI Notes",
            "Exam focused answers",
            "Diagram & chart support",
            "Fast generation",
          ]}
          popular={true}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          isPaying={isPaying}
          payingAmount={payingAmount}
        />
        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits={300}
          description="For serious exam preparation"
          features={[
            "Generate AI Notes",
            "Exam focused answers",
            "Diagram & chart support",
            "Fast generation",
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          isPaying={isPaying}
          payingAmount={payingAmount}
        />
      </div>
    </div>
  );
};

export default Pricing;
