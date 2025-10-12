
export default (sequelize, DataTypes) => {

    const RoleScope = sequelize.define('RoleScope',{
        description: {
            type: DataTypes.TEXT,
            allowNull: true
    }},
     {
    tableName: 'RoleScopes',
    timestamps: true,
    underscored: true
});
    return RoleScope;
}