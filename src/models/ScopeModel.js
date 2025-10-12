
export default (Sequelize,DataTypes) =>{
    const Scope = Sequelize.define('Scope', {
        id_scope: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         allowNull: false
        },
        libelle: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },{
    tableName: 'Scopes',
    timestamps: true,
    underscored: true
});
Scope.associate = (models) => {
    Scope.belongsToMany(models.Role, { through: models.RoleScope ,foreignKey: 'id_scope'})    
};
    return Scope
}