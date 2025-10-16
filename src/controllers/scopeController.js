import db from '../models/index.js';
const { Scope } = db;
export const createScope = async(req, res) => {
    try{
      const { libelle, description } = req.body;
      if (!libelle) {
          return res.status(400).json({ message: 'Libelle  requis' });
      }
      const scope = await Scope.create({ libelle });
      if(description) scope.description = description;
      await scope.save();

      res.status(201).json({ message: 'Rôle créé avec succès', scope });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du rôle' });
    }
};
export const getAllScope = async(req, res) => {
    try {
        const scopes = await Scope.findAll();
    if (scopes.length === 0) {
            return res.status(404).json({ message: 'Aucun scope trouvé' });
        }
        res.status(200).json({data: scopes});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des scopes' });
    }
};