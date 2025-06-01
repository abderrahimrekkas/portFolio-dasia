import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import axios from 'axios';
import image1 from '../docs/image1.png';
import image11 from '../docs/image11.png';
import image111 from '../docs/image111.png';

const Projects = () => {
  const [projects] = useState([
    {
      title: "J’ai développé CookSecure",
      description: "J’ai développé CookSecure, une application de gestion de recettes avec navigation sécurisée selon l’authentification et les rôles.",
      image: image1,
      technologies: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "Axios", "Postman"],
      github: "https://github.com/abderrahimrekkas/CookSecure-",
      
    },
    {
      title: "application de quiz connectée à l’API Trivia avec React",
      description: "J’ai développé une application de quiz connectée à l’API Trivia avec React, TypeScript et Tailwind CSS. L’application permet aux utilisateurs de répondre à des questions de quiz en temps réel, avec une interface utilisateur réactive et moderne.",
      image: image11,
      technologies: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "Axios", "Postman"],
      github: "https://github.com/abderrahimrekkas/Architecture-Technique",
      
    },
    {
      title: "PApplication de consultation de films avec API externe",
      description: "J’ai développé une application web en React JS permettant de consulter des informations actualisées sur des films et séries via l’API TMDb.",
      image: image111,
      technologies: ["MERN Stack", "React", "Node.js", "Express", "MongoDB", "Axios", "Postman"],
      github: "https://github.com/abderrahimrekkas/AbderrahimFilm",
    
    }
  ]);
  const [filteredProjects] = useState(projects);
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">My Projects</h1>
          
      
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary-400 transition-colors"
                    >
                      GitHub
                    </a>
                    
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects; 