export default (sequelize, DataTypes) => {
const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  noms: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  prenoms: {
    type: DataTypes.STRING(100),
    allowNull: true // Prénoms peuvent être optionnels
  },  
  image_profile_url: { // Nouvelle colonne pour le lien de l'image
    type: DataTypes.STRING,
    allowNull: true
  },
  id_structure: {
    type: DataTypes.UUID,
    allowNull: true
  },
  adresse_email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  fonction: { // Ex: 'Administrateur', 'Utilisateur', 'Agent'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  direction: { // Ex: 'Direction Générale', 'Ressources Humaines', 'Finance'
    type: DataTypes.STRING(100),
    allowNull: true
  },
  justificatif: { // Ex: 'Justificatif de fonction', 'Justificatif de direction'
    type: DataTypes.STRING(255),
    allowNull: true, // Justificatif peut être optionnel
  },
  is_actif: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Par défaut, l'utilisateur n'est pas actif
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(20),
    defaultValue: false, // Par défaut, l'utilisateur n'est pas actif
    allowNull: false
  }
}, {
  tableName: 'Utilisateurs',
  timestamps: true,
  underscored: true,
});
// Association entre Utilisateur et Structure
Utilisateur.associate = (models) => {
  Utilisateur.hasOne(models.Role, {onUpdate: 'CASCADE', onDelete: 'CASCADE' });
};
return Utilisateur;
};