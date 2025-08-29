import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwtConfig.js';

// Fonction utilitaire pour générer un token
const generateToken = ( id ) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};
export default generateToken;
