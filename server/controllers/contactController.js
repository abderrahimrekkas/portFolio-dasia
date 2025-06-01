

const nodemailer = require('nodemailer');
const Contact = require('../models/Contact'); // Assurez-vous d'avoir votre modèle Contact

// Configuration du transporteur email (utilisez vos propres paramètres)
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou votre service email
  auth: {
    user: process.env.EMAIL_USER, // Votre email
    pass: process.env.EMAIL_PASS  // Votre mot de passe d'application
  }
});

const contactController = {
  // Soumettre un formulaire de contact
  submitContact: async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      // Validation des données
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont requis'
        });
      }

      // Créer l'entrée dans la base de données
      const newContact = new Contact({
        name,
        email,
        subject,
        message,
        status: 'new',
        createdAt: new Date()
      });

      await newContact.save();

      // Email pour vous (notification du nouveau message)
      const adminMailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Votre email
        subject: `Nouveau message de contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Nouveau Message de Contact
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Sujet:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
              <h3 style="color: #495057; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #6c757d;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
              <p>Message reçu le: ${new Date().toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</p>
            </div>
          </div>
        `
      };

      // Email de confirmation pour l'utilisateur
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation de réception de votre message - Abderrahim Rekkas',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">Merci pour votre message!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Confirmation de réception</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 30px; border: 1px solid #dee2e6; border-top: none;">
              <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
                Bonjour <strong>${name}</strong>,
              </p>
              
              <p style="color: #6c757d; line-height: 1.6; margin-bottom: 20px;">
                J'ai bien reçu votre message concernant "<strong>${subject}</strong>" et je vous remercie de m'avoir contacté.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; margin: 20px 0;">
                <h3 style="color: #007bff; margin-top: 0;">Récapitulatif de votre message:</h3>
                <p style="margin: 5px 0;"><strong>Sujet:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Date d'envoi:</strong> ${new Date().toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}</p>
              </div>
              
              <p style="color: #6c757d; line-height: 1.6; margin-bottom: 20px;">
                Je m'efforce de répondre à tous les messages dans les plus brefs délais, généralement dans les 24-48 heures. 
                Si votre demande est urgente, n'hésitez pas à me contacter directement.
              </p>
              
              <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #0066cc; font-weight: 500;">
                  💡 En attendant, n'hésitez pas à consulter mes projets sur GitHub ou à me suivre sur LinkedIn!
                </p>
              </div>
              
              <p style="color: #6c757d; margin-bottom: 30px;">
                Cordialement,<br>
                <strong style="color: #333;">Abderrahim Rekkas</strong><br>
                <small>Développeur Full Stack</small>
              </p>
              
              <div style="border-top: 1px solid #dee2e6; padding-top: 20px; text-align: center;">
                <p style="color: #adb5bd; font-size: 12px; margin: 0;">
                  Ceci est un message automatique de confirmation. Merci de ne pas répondre à cet email.
                </p>
              </div>
            </div>
          </div>
        `
      };

      // Envoyer les emails
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);

      res.status(201).json({
        success: true,
        message: 'Message envoyé avec succès! Vous recevrez un email de confirmation.',
        data: {
          id: newContact._id,
          name: newContact.name,
          email: newContact.email,
          subject: newContact.subject,
          createdAt: newContact.createdAt
        }
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de l\'envoi du message',
        error: error.message
      });
    }
  },

  // Récupérer tous les messages de contact
  getContacts: async (req, res) => {
    try {
      const { page = 1, limit = 10, status } = req.query;
      
      const query = status ? { status } : {};
      
      const contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      
      const total = await Contact.countDocuments(query);
      
      res.json({
        success: true,
        data: contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalContacts: total
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la récupération des contacts'
      });
    }
  },

  // Mettre à jour le statut d'un contact
  updateContactStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['new', 'read', 'replied', 'archived'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Statut invalide'
        });
      }

      const contact = await Contact.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date() },
        { new: true }
      );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact non trouvé'
        });
      }

      res.json({
        success: true,
        message: 'Statut mis à jour avec succès',
        data: contact
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la mise à jour'
      });
    }
  }
};

module.exports = contactController;