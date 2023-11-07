const { User } = require('../../sequelize')
  
module.exports = (app) => {
  app.get('/user/:id', (req, res) => {
    User.findByPk(req.params.id)
      .then(user => {
        const message = 'Un user a bien été trouvé.'
        res.json({ message, data: user })
      })
  })
}