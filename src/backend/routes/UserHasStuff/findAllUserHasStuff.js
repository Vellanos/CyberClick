const { Userhasstuff } = require('../../sequelize');

module.exports = (app) => {
  app.get('/userhasstuff/:user_id', (req, res) => {
    const userId = req.params.user_id;

    Userhasstuff.findAll({
      where: {
        user_id: userId,
      },
      order: [
        ['stuff_id', 'ASC'],
      ],
    })
      .then((userhasstuff) => {
        const message = 'The list of userhasstuff has been retrieved.';
        res.json({ message, data: userhasstuff });
      })
      .catch((error) => {
        console.error('Error retrieving userhasstuff:', error);
        res.status(500).json({ error: 'Internal Server Error 500' });
      });
  });
};
