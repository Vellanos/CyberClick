const { Userhasbonus } = require('../../sequelize');

module.exports = (app) => {
  app.get('/userhasbonus/:user_id', (req, res) => {
    const userId = req.params.user_id;

    Userhasbonus.findAll({
      where: {
        user_id: userId,
      },
      order: [
        ['bonus_id', 'ASC'],
      ],
    })
      .then((userhasbonus) => {
        const message = 'The list of userhasbonus has been retrieved.';
        res.json({ message, data: userhasbonus });
      })
      .catch((error) => {
        console.error('Error retrieving userhasbonus:', error);
        res.status(500).json({ error: 'Internal Server Error 500' });
      });
  });
};
