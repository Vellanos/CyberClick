const { User } = require('../../sequelize');
const bcrypt = require('bcrypt');

module.exports = (app) => {
  app.post('/user', async (req, res) => {
    const { email, mdp } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(mdp, 10);

      const user = await User.create({
        email: email,
        mdp: hashedPassword,
      });

      const message = 'Le user a bien été créé.';
      res.json({ message, data: user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
};
