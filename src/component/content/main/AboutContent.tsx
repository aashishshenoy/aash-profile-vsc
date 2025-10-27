import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useData } from "../../common/dataUtils";
import { AboutData } from "../../../types";
import Breadcrumb from "../../common/Breadcrumb";

const AboutContent: React.FC = () => {
  const { site, loading } = useData();
  
  if (loading || !site) {
    return (
      <div className="p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!site.about) {
    console.error('AboutContent: site.about is missing', site);
    return (
      <div className="p-6 w-full flex justify-center items-center">
        <div className="text-red-500">Error: About data is missing</div>
      </div>
    );
  }
  
  const aboutData = site.about as unknown as AboutData;
  const { name, title, summary, experience, education } = aboutData;
  const { links } = site;
  
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="About" customSegments={['main', 'about']} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg p-6 w-full"
      >
        <h2 className="text-2xl font-bold mb-4">{name}</h2>
        <h3 className="text-xl text-blue-400 mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">
          {summary}
        </p>
        <h3 className="text-xl font-semibold mb-3">Experience</h3>
        <div className="space-y-4 mb-6">
          {experience && experience.map((exp, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4 mb-4">
              <h4 className="font-semibold">{exp.role}</h4>
              <p className="text-gray-400">{exp.company}</p>
              <ul className="text-gray-300 mt-2 list-disc pl-5">
                {exp.details.map((detail, i) => (
                  <li key={i} className="mb-1">{detail}</li>
                ))}
              </ul>
            </div>
          ))}
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Education</h3>
          {education && education.map((edu, index) => (
            <div key={index} className="border-l-2 border-blue-500 pl-4 mb-4">
              <h4 className="font-semibold">{edu.level}</h4>
              <p className="text-gray-400">{edu.school}</p>
            </div>
          ))}
          
          <h3 className="text-xl font-semibold mb-3 mt-6">Connect</h3>
          <div className="flex space-x-4 overflow-hidden">
            <a
              href={links?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-blue-400"
            >
              <Github className="mr-2" size={20} />
              GitHub
            </a>
            <a
              href={links?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-blue-400"
            >
              <Linkedin className="mr-2" size={20} />
              LinkedIn
            </a>
            <a
              href={`mailto:${links?.email}`}
              className="flex items-center text-gray-300 hover:text-blue-400"
            >
              <Mail className="mr-2" size={20} />
              Email
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutContent;
