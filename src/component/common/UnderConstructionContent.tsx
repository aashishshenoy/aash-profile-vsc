import { motion } from "framer-motion";
import React from "react";

// Use SVG from public directory
const underConstructionImg = "/images/under-construction.svg";

const UnderConstructionContent: React.FC<{ currentPageTitle: string }> = () => {
  return (
    <div className="p-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Under Construction</h2>
        <img 
          src={underConstructionImg} 
          alt="Under Construction" 
          className="w-full max-w-md mb-6"
        />
        <p className="text-gray-300 text-center text-lg">
          This section is coming soon!
        </p>
      </motion.div>
    </div>
  );
};

export default UnderConstructionContent;
