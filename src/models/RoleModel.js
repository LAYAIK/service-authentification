export default (sequelize, DataTypes) => {    
const Role = sequelize.define('Role', {
    id_role: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true // Assumons que le role est unique
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'Roles',
    timestamps: true,
    underscored: true
});
Role.associate = (models) => {
    Role.hasMany(models.Utilisateur, { onUpdate: 'CASCADE', onDelete: 'CASCADE' });
    Role.belongsToMany(models.Scope, { through: models.RoleScope ,foreignKey: 'id_role'})
};

return Role;
};