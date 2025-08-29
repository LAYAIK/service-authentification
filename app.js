import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pino from 'pino';
import { pinoHttp } from 'pino-http';
import 'dotenv/config'; // charge les variables d'environnement à partir du fichier .env
import swaggerSetup from './swagger.js';
import ApiRoutes from './src/routes/index.js'; // importation des routes d'authentification


const app = express(); // création de l'application express
app.use(bodyParser.json()); // pour parser le corps des requêtes JSON


// ✅ Configuration CORS COMPLÈTE et EXPLICITE
app.use(cors({
  origin: 'http://localhost:5173', // URL EXACT de votre frontend React
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Authorization']
}));


// Middleware pour parser le JSON


const logger = pino({ 
    level: process.env.LOG_LEVEL || 'info',  // niveau de log, par défaut 'info'
    transport: {
        target: 'pino-pretty', // pour formater les logs de manière lisible
        options: {
            
            ignore: 'pid,hostname', // ignorer les informations de processus et d'hôte
            translateTime: 'SYS:standard', // pour afficher l'heure dans un format standard
            colorize: true  // pour colorer les logs dans la console
        }
    }
});

app.use(pinoHttp({ logger })); // middleware pour logger les requêtes HTTP

swaggerSetup(app); // initialisation de swagger

ApiRoutes(app); // initialisation des routes

export default app; // exporte l'application express