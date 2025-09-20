import db from "../models/index.js";
const { Utilisateur } = db;
import { Op } from "sequelize";
import generateToken from "./generateToken.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwtConfig.js';


// controller pour l'authentification de l'utilisateur par email et mot de passe

const loginController = async (req, res) => {
const { adresse_email, password } = req.body || {};
console.log('Tentative de connexion pour:', adresse_email , password ? 'avec mot de passe fourni' : 'sans mot de passe');

    if (!adresse_email || !password) {
        return res.status(400).json({message: "Email et mot de passe sont requis"});
    }
    try {
        const user = await Utilisateur.findOne({ where: { adresse_email } });
        if (!user) {
            return res.status(401).json({message: "Identifiants invalides"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Identifiants invalides"});
        }
        const token = generateToken(user.id_utilisateur ); // Génération du token JWT

        return res
            // .header('Authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête de la réponse
            // .cookie('token', token, {  // Créer un cookie avec le token
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            //     maxAge: 24 * 60 * 60 * 1000
            // })
            .status(200)
            .json({
                token,
                message: "Authentification réussie",
                data: user,
                success: true
            });

    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        return res.status(500).json({ message: "Erreur d'authentification"});
    }
};


const askController = async (req, res) => {
    try {

    const { adresse_email, fonction, direction, justificatif } = req.body;
    if (!adresse_email || !fonction || !direction || !justificatif) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    const existingUser = await Utilisateur.findOne({
        where: {
             adresse_email
        }
    });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (existingUser.is_actif) {
        return res.status(404).json({ message: "L\'Utilisateur existe deja veuillez vous connecter" });
    }
    if(existingUser.date_demande !== null) {
        return res.status(400).json({ message: `Une demande a déjà été envoyée pour cet utilisateur le ${existingUser.date_demande} a l'administrateur veuillez patienter` });
    }
    let date_demande = new Date().toISOString().replace('T', ' ').slice(0, 19); // Date et heure actuelles au format YYYY-MM-DD HH:MM:SS
    const [updatedRows] = await Utilisateur.update(
        { fonction, direction, justificatif, date_demande }, // Mettre à jour 
        { where: { adresse_email } }
    );
    if (updatedRows === 0) {
        return res.status(400).json({ message: "Aucune mise à jour effectuée" });
    }
    const updatedUser = await Utilisateur.findOne({ where: { adresse_email } });
    res.status(201).json({ message: 'Demande envoyée', user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de la demande' });

    }

};

const registerController = async (req, res) => {
    try {
    const { adresse_email, password, password_confirmation, noms, prenoms } = req.body;
    if (!adresse_email || !password || !noms || !prenoms || !password_confirmation) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });    
    }
    if (password !== password_confirmation) { 
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // verification de l'utilisateur avec email et matricule dans la base de données
    const existingUser = await Utilisateur.findOne({
        where: {
            adresse_email 
        }
    });
    if (existingUser) {
        return res.status(400).json({ message: 'L\'utilisateur avec cet email existe déjà veuillez vous connecter', user: existingUser });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const datePart = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const timePart = new Date().toISOString().slice(11, 19).replace(/:/g, '');
    const matricule = `MINADER${datePart}${timePart}`; // Génération d'un matricule unique
    const user = await Utilisateur.create({ adresse_email, password: hashedPassword, noms, prenoms, matricule});
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
    };

    async function verificationTokenController(req, res) {
  try {
    console.log('🔐 Requête de vérification de token reçue');
    
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('❌ Header Authorization manquant');
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token manquant dans le header Authorization'
      });
    }

    // Vérifier le format "Bearer TOKEN"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      console.log('❌ Format Authorization incorrect:', authHeader);
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Format incorrect. Utilisez: Bearer <token>'
      });
    }

    const token = parts[1];
    
    if (!token) {
      console.log('❌ Token vide');
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token vide'
      });
    }

    console.log('🔍 Vérification du token:', token.substring(0, 20) + '...');

    // Vérifier le token JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    
    console.log('✅ Token valide pour l\'utilisateur:', decoded.userId || decoded.id);
    const user = await Utilisateur.findByPk(decoded.id);
    if (!user) {
      console.log('❌ Utilisateur non rencontré');
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Utilisateur non rencontré'
      });
    }

    // Réponse de succès
    res.json({
      success: true,
      valid: true,
      message: 'Token valide',
      user,
      issuedAt: new Date(decoded.iat * 1000),
      expiresAt: new Date(decoded.exp * 1000),
      expiresIn: `${Math.max(0, decoded.exp - Math.floor(Date.now() / 1000))} secondes`
    });

  } catch (error) {
    console.error('❌ Erreur de vérification:', error.message);
    
    // Gestion des différents types d'erreurs JWT
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token expiré',
        expiredAt: new Date(error.expiredAt)
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        valid: false,
        message: 'Token invalide',
        error: error.message
      });
    }

    // Erreur générale
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Erreur interne du serveur'
    });
  }
};
// Controller pour la déconnexion
const logoutController = (req, res) => {
  try {
    res.clearCookie('token'); // Suppression du cookie
    res.status(200).json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la déconnexion' });
  }
};

 export {
        logoutController,
        loginController,
        registerController,
        askController,
        verificationTokenController
    };

