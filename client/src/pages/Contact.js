// import React from 'react';
// import { motion } from 'framer-motion';
// import { FaGithub, FaLinkedin, FaEnvelope,  } from 'react-icons/fa';
// import abderrahimrekkas from "../docs/abderrahimrekkas.JPG";
// const Contact = () => {
//   const contactInfo = [
//     {
//       icon: <FaEnvelope className="h-6 w-6" />,
//       label: 'Email',
//       value: 'rekkasabderrahim8@gmail.com',
//       link: 'mailto:rekkasabderrahim8@gmail.com'
//     },
//     {
//       icon: <FaGithub className="h-6 w-6" />,
//       label: 'GitHub',
//       value: 'github.com/rekkas',
//       link: 'https://github.com/abderrahimrekkas/'
//     },
//     {
//       icon: <FaLinkedin className="h-6 w-6" />,
//       label: 'LinkedIn',
//       value: 'linkedin.com/in/rekkas',
//       link: 'https://www.linkedin.com/in/abderrahim-rekkas-37327a1b3/'
//     },
   
//   ];

//   return (
//     <div className="section">
//       <div className="container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="heading text-center">Contact Me</h1>

//           <div className="max-w-4xl mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               className="flex flex-col md:flex-row items-center gap-12 mb-16"
//             >
//               <div className="relative w-64 h-64">
//                 <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full animate-pulse"></div>
//                 <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full overflow-hidden">
//                   <img
//                     src={abderrahimrekkas}
//                     alt="abderrahim rekkas"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
//                   <span className="text-white text-3xl">💬</span>
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   Let's Connect!
//                 </h2>
//                 <p className="text-gray-600 dark:text-gray-400 mb-6">
//                   I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
//                 </p>
//                 <div className="grid gap-4">
//                   {contactInfo.map((info, index) => (
//                     <motion.a
//                       key={info.label}
//                       href={info.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
//                       className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
//                     >
//                       <div className="text-primary-600 dark:text-primary-400 mr-4">
//                         {info.icon}
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                           {info.label}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-400">
//                           {info.value}
//                         </p>
//                       </div>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contact; 



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import abderrahimrekkas from "../docs/abderrahimrekkas.JPG";
import emailjs from 'emailjs-com';
import contactConfig from '../components/ContactConf';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const contactInfo = [
    {
      icon: <FaEnvelope className="h-6 w-6" />,
      label: 'Email',
      value: 'rekkasabderrahim8@gmail.com',
      link: 'mailto:rekkasabderrahim8@gmail.com'
    },
    {
      icon: <FaGithub className="h-6 w-6" />,
      label: 'GitHub',
      value: 'github.com/rekkas',
      link: 'https://github.com/abderrahimrekkas/'
    },
    {
      icon: <FaLinkedin className="h-6 w-6" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/rekkas',
      link: 'https://www.linkedin.com/in/rekkas/'
    }
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Envoie vers ton backend ici
      // await axios.post('/api/contact', formData);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
const templateParams = {
      name: formData.name, // Fixed: was using email instead of name
      email: formData.email,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setFormData({
            email: "",
            name: "",
            message: "",
            loading: false,
            alertmessage: "SUCCESS! Thank you for your message. I'll get back to you soon!",
            variant: "success",
            show: true,
          });
        },
        (error) => {
          console.error("Email send failed:", error);
          setFormData(prev => ({
            ...prev,
            loading: false,
            alertmessage:`
 Failed to send message": ${error.text || error.message || 'Unknown error'}`
,
            variant: "danger",
            show: true,
          
    }))})
          // Scroll to alert
          setTimeout(() => {
            const alertElement = document.getElementsByClassName("co_alert")[0];
            if (alertElement) {
              alertElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }

      
    catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Contactez-moi</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Partie gauche - Infos de contact */}
        <motion.div
          className="space-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <img src={abderrahimrekkas} alt="Abderrahim Rekkas" className="rounded-lg shadow-lg w-64 mx-auto" />

          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-2 border rounded hover:bg-gray-100 transition"
            >
              {item.icon}
              <div>
                <p className="font-semibold">{item.label}</p>
                <p className="text-sm text-gray-600">{item.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Partie droite - Formulaire */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-while-700 transition"
            >
              <FaPaperPlane />
              <span>{isSubmitting ? 'Envoi...' : 'Envoyer'}</span>
            </button>

            {submitStatus === 'success' && (
              <p className="text-green-600 flex items-center space-x-2">
                <FaCheckCircle /> <span>Message envoyé avec succès !</span>
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600">Erreur lors de l'envoi du message.</p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
