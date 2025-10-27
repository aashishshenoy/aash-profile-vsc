import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useData } from '../../common/dataUtils';
import { Project } from '../../../types';
import Breadcrumb from '../../common/Breadcrumb';

const ProjectsContent: React.FC = () => {
  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const { site } = useData();
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      className="p-6 w-full"
    >
      <Breadcrumb currentPageTitle="Projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {site?.projects?.map((project: Project, index: number) => (
          <motion.div
            key={project.title}
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-700 rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400"
                  >
                    <Github className="mr-1" size={16} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400"
                  >
                    <ExternalLink className="mr-1" size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsContent;
