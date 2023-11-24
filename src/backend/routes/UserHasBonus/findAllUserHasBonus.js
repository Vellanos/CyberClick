const { Userhasbonus } = require('../../sequelize');

module.exports = (app) => {
  app.get('/userhasbonus/:user_id', (req, res) => {
    const userId = req.params.user_id;

    Userhasbonus.findAll({
      where: {
        user_id: userId,
      },
      order: [
        ['bonus_id', 'ASC'], // 'ASC' for ascending order, 'DESC' for descending order
      ],
    })
      .then((userhasbonus) => {
        const message = 'La Liste des userhasbonus a bien été récupérée.';
        res.json({ message, data: userhasbonus });
      })
      .catch((error) => {
        console.error('Error retrieving userhasbonus:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
};
