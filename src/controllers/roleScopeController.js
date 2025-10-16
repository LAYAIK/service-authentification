import db from '../models/index.js';
const { RoleScope } = db;
export const createRoleScope = async(req, res) => {
    try{
      const { id_role, id_scope } = req.body;
      if (!id_role && !id_scope) {
          return res.status(400).json({ message: 'id_scope et id_role requis' });
      }

      console.log('backend role scope : ',req.body)
      const roleScope = await RoleScope.create({id_role, id_scope});
      //if(description) roleSRoleScope.description = description;
      //await roleSRoleScope.save();

      res.status(201).json({ message: 'Rôle créé avec succès', roleScope });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du rôle' });
    }
};
export const getAllRoleScope = async(req, res) => {
    try {
        const roleScopes = await RoleScope.findAll();
    if (roleScopes.length === 0) {
            return res.status(404).json({ message: 'Aucun scope trouvé' });
        }
        res.status(200).json({data: roleScopes});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des roleScopes' });
    }
};

export const deleteRoleScope = async (req, res) => {
  try {
    const { id_role, id_scope } = req.body;

    console.log('bodey delete', req.body)

    const deletedCount = await RoleScope.destroy({
      where: { id_role, id_scope },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        message: "⚠️ Aucune correspondance trouvée pour ce rôle-scope",
      });
    }

    return res.status(200).json({
      message: "🗑️ Permission supprimée avec succès",
    });
  } catch (error) {
    console.error("❌ Erreur suppression RoleScope :", error);
    return res.status(500).json({
      message: "Erreur lors de la suppression du rôle-scope",
      error: error.message,
    });
  }
};

