import React from 'react';
import abderrahimrekkas from "../docs/abderrahimrekkas.JPG"
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-left flex-1"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Hi, I'm <span className="text-primary-600 dark:text-primary-400">abderrahim rekkas</span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-10"
            >
              Full Stack Developer
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl"
            >
              Proficient MERN Stack Developer with 1+ years of hands-on experience in building responsive, 
              dynamic web applications. Skilled in React.js, Node.js, Express.js, and MongoDB, with expertise 
              in translating complex business requirements into scalable technical solutions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex space-x-6"
            >
              <Link
                to="/projects"
                className="btn btn-primary px-8 py-3 text-lg"
              >
                View My Work
              </Link>
              <Link
                to="/contact"
                className="btn btn-secondary px-8 py-3 text-lg"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Profile picture */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative w-64 h-96"
          >
            {/* Outer gradient ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-2xl animate-spin-slow opacity-75"></div>
            
            {/* Middle ring */}
            <div className="absolute inset-3 bg-gradient-to-br from-primary-300 to-primary-700 rounded-2xl animate-pulse"></div>
            
            {/* Inner white/dark background */}
            <div className="absolute inset-6 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={abderrahimrekkas}
                alt="Babuji Telagathoti"
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Decorative elements */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-6 -right-6 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-3xl">💻</span>
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-3xl">🚀</span>
            </motion.div>
            
            {/* Animated dots */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-8 top-1/3 w-4 h-4 bg-primary-400 rounded-full animate-bounce"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -left-8 top-2/3 w-4 h-4 bg-primary-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 