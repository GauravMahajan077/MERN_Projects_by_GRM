// src/Box.js
import React from "react";
import { motion } from "framer-motion";

const Box = () => {
  return (
    <motion.div
      initial={{ x: 0 }}        // starting position
      animate={{ x: 200 }}      // target position
      transition={{             // smooth spring animation
        type: "spring",
        stiffness: 60
      }}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blue"
      }}
    />
  );
};

export default Box;