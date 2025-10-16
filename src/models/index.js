import { Sequelize, DataTypes } from 'sequelize'; // Importe Sequelize et DataTypes directement
import sequelize from '../config/sequelizeInstance.js'; // Import the Sequelize instance
import Utilisateur from './UtilisateurModel.js'
import Role from './RoleModel.js';
import Scope from './ScopeModel.js';
import RoleScope from './RoleScopeModel.js';


const db = {}; // Objet pour stocker les modèles

db.Sequelize = Sequelize; // Sequelize est déjà importé en tant que classe
db.sequelize = sequelize; // La connexion est déjà importé



db.Role = Role(sequelize, DataTypes);
db.Utilisateur = Utilisateur(sequelize, DataTypes);
db.Scope = Scope(sequelize,DataTypes);
db.RoleScope = RoleScope(sequelize, DataTypes);


// Définissez les associations après que tous les modèles ont été chargés
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
export default db; // L'exportation par défaut est déjà en place