import { motion } from "framer-motion";
import React from "react";
import { useData } from "../../common/dataUtils";
import { Code } from "lucide-react";
import { SkillGroup } from "../../../types";
import Breadcrumb from "../../common/Breadcrumb";

const SkillsContent: React.FC = () => {
  const { site } = useData();
  
  if (!site || !site.skills) {
    return null;
  }
  
  const skills = site.skills as SkillGroup[];
  
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Skills & Expertise" customSegments={['main', 'skills']} />
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
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, index) => {
            // Map color names to Tailwind classes instead of using string interpolation
            const getColorClasses = (color: string) => {
              switch (color) {
                case 'blue':
                  return { border: 'border-blue-400', bg: 'bg-blue-500', text: 'text-blue-400' };
                case 'indigo':
                  return { border: 'border-indigo-400', bg: 'bg-indigo-500', text: 'text-indigo-400' };
                case 'purple':
                  return { border: 'border-purple-400', bg: 'bg-purple-500', text: 'text-purple-400' };
                case 'pink':
                  return { border: 'border-pink-400', bg: 'bg-pink-500', text: 'text-pink-400' };
                case 'red':
                  return { border: 'border-red-400', bg: 'bg-red-500', text: 'text-red-400' };
                case 'orange':
                  return { border: 'border-orange-400', bg: 'bg-orange-500', text: 'text-orange-400' };
                case 'yellow':
                  return { border: 'border-yellow-400', bg: 'bg-yellow-500', text: 'text-yellow-400' };
                case 'green':
                  return { border: 'border-green-400', bg: 'bg-green-500', text: 'text-green-400' };
                case 'teal':
                  return { border: 'border-teal-400', bg: 'bg-teal-500', text: 'text-teal-400' };
                case 'cyan':
                  return { border: 'border-cyan-400', bg: 'bg-cyan-500', text: 'text-cyan-400' };
                default:
                  return { border: 'border-gray-400', bg: 'bg-gray-500', text: 'text-gray-400' };
              }
            };
            
            const { border, bg, text } = getColorClasses(category.color);

            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-gray-900 rounded-lg p-4 shadow-lg border ${border} h-full`}
              >
                <div className="flex items-center mb-4">
                  <Code className={text} size={20} />
                  <h3 className={`text-xl font-semibold ml-2 ${text}`}>{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex flex-col space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">{skill.name}</span>
                          <span className={`text-xs ${text}`}>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`${bg} h-full rounded-full`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsContent;
