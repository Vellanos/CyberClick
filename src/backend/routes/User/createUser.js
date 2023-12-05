const { User, Userhasbonus, Userhasstuff, Bonus, Stuff } = require('../../sequelize');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  app.post('/user', async (req, res) => {
    const { email, mdp } = req.body;

    try {
      const existingUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(mdp, 10);

      const user = await User.create({
        email: email,
        mdp: hashedPassword,
      });

      const allBonuses = await Bonus.findAll();
      const allStuff = await Stuff.findAll();

      await Promise.all(
        allBonuses.map(async (bonus) => {
          await Userhasbonus.create({
            user_id: user.id,
            bonus_id: bonus.id,
            number: 0,
          });
        })
      );

      await Promise.all(
        allStuff.map(async (stuff) => {
          await Userhasstuff.create({
            user_id: user.id,
            stuff_id: stuff.id,
            statut: false,
          });
        })
      );

      const message = 'The user has been created with associated bonuses and stuff.';
      res.json({ message, data: user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
