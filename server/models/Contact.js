
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir un email valide'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    trim: true,
    maxlength: [200, 'Le sujet ne peut pas dépasser 200 caractères']
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
    maxlength: [2000, 'Le message ne peut pas dépasser 2000 caractères']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  }
}, {
  timestamps: true 
});

// Index pour améliorer les performances de recherche
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Méthode pour formater la date
contactSchema.methods.getFormattedDate = function() {
  return this.createdAt.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Middleware pour capturer l'IP et le User Agent (optionnel)
contactSchema.pre('save', function(next) {
  if (this.isNew) {
    // Vous pouvez ajouter ici la logique pour capturer l'IP et le User Agent
    // depuis la requête HTTP si nécessaire
  }
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;