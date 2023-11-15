const { Userhasstuff } = require('../../sequelize');

module.exports = (app) => {
  app.get('/userhasstuff/:user_id', (req, res) => {
    const userId = req.params.user_id;

    Userhasstuff.findAll({
      where: {
        user_id: userId,
      },
    })
      .then((userhasstuff) => {
        const message = 'La Liste des userhasstuff a bien été récupérée.';
        res.json({ message, data: userhasstuff });
      })
      .catch((error) => {
        console.error('Error retrieving userhasstuff:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
};
