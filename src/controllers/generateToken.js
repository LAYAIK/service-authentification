import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwtConfig.js';

// Fonction utilitaire pour générer un token
const generateToken = ( payload ) => {
  return jwt.sign(payload , JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
export default generateToken;
