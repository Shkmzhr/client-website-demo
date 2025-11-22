import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = 24, color = "#fff" }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      style={{
        width: size,
        height: size,
        border: `${size * 0.18}px solid ${color}40`,
        borderTop: `${size * 0.18}px solid ${color}`,
        borderRadius: "50%",
      }}
    />
  );
};

export default Loader;
