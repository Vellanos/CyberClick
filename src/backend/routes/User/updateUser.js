const { User } = require('../../sequelize')
  
module.exports = (app) => {
  app.put('/user/:id', (req, res) => {
    const userId = req.params.id
    User.update(req.body, {
      where: { id: userId }
    })
    .then(_ => {
        User.findByPk(userId).then(user => {
        const message = `The user with the ID ${user.id} has been successfully modified.`
        res.json({message, data: user })
      })
    })
  })
}