import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useData } from "../../common/dataUtils";
import Breadcrumb from "../../common/Breadcrumb";

const ContactContent: React.FC = () => {
  const { site } = useData(); 
  
  if (!site) {
    return null;
  }
  
  const links = site.links || {};
  
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Contact" customSegments={['main', 'contact']} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 w-full"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6"
        >
          Get in Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Phone className="mr-3 text-blue-400" size={20} />
                  <a href={`tel:${links.phone}`} className="hover:text-blue-400">{links.phone}</a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="mr-3 text-blue-400" size={20} />
                  <a href={`mailto:${links.email}`} className="hover:text-blue-400">{links.email}</a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Github className="mr-3 text-blue-400" size={20} />
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub Profile</a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Linkedin className="mr-3 text-blue-400" size={20} />
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn Profile</a>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactContent;
