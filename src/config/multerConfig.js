// src/config/multerConfig.js
import multer from 'multer';
import path from 'path';

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles');
  },
  filename: (req, file, cb) => {
    // Crée un nom de fichier unique basé sur la date et le nom original
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Filtre pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Le fichier n\'est pas une image !'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limite de 5MB
  }
});

export default upload;