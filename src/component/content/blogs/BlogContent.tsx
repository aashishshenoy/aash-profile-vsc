import { motion } from "framer-motion";
import React from "react";
import Breadcrumb from "../../common/Breadcrumb";
import { FileText, FolderOpen } from "lucide-react";

const BlogContent: React.FC = () => {
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Blogs" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Technical Blog</h2>
        
        <div className="flex items-center justify-center mb-6 text-blue-400">
          <FolderOpen size={64} />
        </div>
        
        <div className="text-gray-300 text-center max-w-2xl">
          <p className="mb-4 text-lg">
            Browse through my technical blog posts in the Explorer panel.
          </p>
          
          <div className="bg-gray-700 p-4 rounded-lg mb-6 text-left">
            <h3 className="text-blue-300 font-semibold mb-2 flex items-center">
              <FileText size={18} className="mr-2" /> Available Categories
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="text-blue-200">System Design</span> - Architecture patterns and system design concepts</li>
              <li><span className="text-blue-200">Best Practices</span> - Coding standards and development best practices</li>
              <li><span className="text-blue-200">Datastructures & Algorithms</span> - Deep dives into algorithms and data structures</li>
              <li><span className="text-blue-200">Engineering Leadership</span> - Insights on technical leadership and team building</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-400">
            Click on any markdown file in the Explorer to view its contents with full formatting and diagrams.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogContent;
