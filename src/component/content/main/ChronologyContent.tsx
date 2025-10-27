import React from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../common/dataUtils';
import { Calendar } from 'lucide-react';
import { ChronologyItem } from '../../../types';
import Breadcrumb from '../../common/Breadcrumb';

const ChronologyContent: React.FC = () => {
  const { site, loading } = useData();
  
  if (loading || !site) {
    return (
      <div className="p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!site.chronology) {
    return (
      <div className="p-6 w-full flex justify-center items-center">
        <div className="text-red-500">Error: Chronology data is missing</div>
      </div>
    );
  }
  
  const chronology = site.chronology as ChronologyItem[];
  
  // Group chronology items by year
  const chronologyByYear: Record<string, ChronologyItem[]> = {};
  chronology.forEach(item => {
    if (!chronologyByYear[item.year]) {
      chronologyByYear[item.year] = [];
    }
    chronologyByYear[item.year].push(item);
  });
  
  // Get unique years and sort them in descending order
  const years = Object.keys(chronologyByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  return (
    <div className="p-6 w-full">
      <Breadcrumb currentPageTitle="Professional Journey" customSegments={['main', 'chronology']} />
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
          Professional Journey
        </motion.h2>
        
        <div className="relative pl-8 md:pl-12">
          {/* Timeline vertical line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-orange-400"></div>
          
          {years.map((year, yearIndex) => (
            <div key={year} className="mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
                className={`absolute left-0 md:left-4 w-8 h-8 rounded-full border-2 flex items-center justify-center -ml-4 md:-ml-4 bg-gray-900 ${chronologyByYear[year][0].color}`}
                style={{ top: `${yearIndex * 8 + 1.5}rem` }}
              >
                <Calendar size={14} className={chronologyByYear[year][0].color.split(' ')[0]} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: yearIndex * 0.15 }}
                className="mb-6"
              >
                <h3 className={`text-xl font-bold mb-4 ${chronologyByYear[year][0].color.split(' ')[0]}`}>{year}</h3>
                
                <div className="space-y-4">
                  {chronologyByYear[year].map((item, itemIndex) => (
                    <motion.div
                      key={`${year}-${itemIndex}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: (yearIndex * 0.15) + (itemIndex * 0.1) }}
                      className={`bg-gray-900 rounded-lg p-4 border-l-2 ${item.color.replace('text-', 'border-')} hover:border-blue-400 transition-colors duration-300`}
                    >
                      <div className={`font-semibold ${item.color.split(' ')[0]} mb-1`}>{item.company}</div>
                      <div className="text-gray-300">{item.event}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ChronologyContent;