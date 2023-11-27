
const { User } = require('../../sequelize')

module.exports = (app) => {
    app.get('/user', (req, res) => {
        User.findAll()
            .then(user => {
                const message = 'La Liste des user a bien été récupérée.'
                res.json({ message, data: user })
            })
    })

}


