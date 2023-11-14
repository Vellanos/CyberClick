const { User, Userhasbonus, Userhasstuff, Bonus, Stuff } = require('../../sequelize');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  app.post('/user', async (req, res) => {
    const { email, mdp } = req.body;

    try {
      // Vérifier si l'email existe déjà
      const existingUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        // Si l'email existe déjà, renvoyer une erreur
        return res.status(400).json({ error: 'Cet email est déjà enregistré.' });
      }

      const hashedPassword = await bcrypt.hash(mdp, 10);

      // Créer l'utilisateur
      const user = await User.create({
        email: email,
        mdp: hashedPassword,
      });

      // Récupérer tous les bonus et stuff de la base de données
      const allBonuses = await Bonus.findAll();
      const allStuff = await Stuff.findAll();

      // Créer une ligne dans Userhasbonus pour chaque bonus avec le nombre initialisé à 0
      await Promise.all(
        allBonuses.map(async (bonus) => {
          await Userhasbonus.create({
            user_id: user.id,
            bonus_id: bonus.id,
            number: 0,
          });
        })
      );

      // Créer une ligne dans Userhasstuff pour chaque stuff avec le statut initialisé à false
      await Promise.all(
        allStuff.map(async (stuff) => {
          await Userhasstuff.create({
            user_id: user.id,
            stuff_id: stuff.id,
            statut: false,
          });
        })
      );

      const message = 'Le user a bien été créé avec des bonus et stuff associés.';
      res.json({ message, data: user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
