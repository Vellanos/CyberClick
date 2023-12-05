const { User } = require('../../sequelize');

module.exports = (app) => {
  app.get('/user/:email', (req, res) => {
    const userEmail = req.params.email;

    User.findOne({
      where: {
        email: userEmail,
      },
    })
      .then((user) => {
        const message = 'A user has been found.';
        res.json({ message, data: user });
      })
      .catch((error) => {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: 'Internal Server Error 500' });
      });
  });
};
